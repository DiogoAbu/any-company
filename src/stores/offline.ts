import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import axios, { AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';
import { action, flow, observable } from 'mobx';
import { persist } from 'mobx-persist';

import Stores from '!/stores/stores';
import api from '!/utils/api';

export interface ActionArgs<A = any, D = any> {
  stores: Stores;
  res: AxiosResponse<D>;
  args: A;
}

export interface QueueItem<A = any, D = any> {
  request: AxiosRequestConfig;
  commit?: (result: ActionArgs<A, D>) => any;
  rollback?: (result: ActionArgs<A, D>) => any;
  passArgs?: A;
}

export interface Queue extends QueueItem {
  started: number;
  attemptCount: number;
  cancelToken: CancelToken;
}

export interface History
  extends Omit<Queue, 'commit' | 'rollback' | 'cancelToken'> {
  status: number;
  didCommit: boolean;
  finished: number;
}

export default class OfflineStore {
  /** Ref to other stores. */
  private stores: Stores;

  /** List of request to be executed. */
  @persist('list')
  @observable
  queue: Queue[] = [];

  /** List of request already executed. */
  @persist('list')
  @observable
  history: History[] = [];

  /** Whether a request is running. */
  @observable
  busy = false;

  /** Describes the current state of the network. */
  @observable
  netInfo: NetInfoState;

  /** Handler for network state updates */
  netInfoUnsubscribe: NetInfoSubscription;

  /** Whether the store finished loading from storage. */
  hydrated = false;

  /** When next run will occur */
  nextRunTime = 0;

  /** HTTP status that will cause a retry. */
  retryStatus: number[] = [408, 429, 503, 504, 507, 599];

  /** How long should we wait before trying again. */
  retryTimeouts: number[] = [3000, 7000, 15000, 30000];

  /** Maximum number of times to retry. Default value is the timeout length. */
  retryMax: number = this.retryTimeouts.length;

  /** Max length of the history array */
  historyMax = 50;

  constructor(stores: Stores) {
    this.stores = stores;
    this.netInfoUnsubscribe = NetInfo.addEventListener(this.setNetInfo);
  }

  /** Called when store finished loading from storage. Will run queue. */
  hydrationComplete() {
    this.hydrated = true;
    this.run();
  }

  /**
   * Store network information. If internet is reachable and store
   * is hydrated, run queue.
   */
  @action.bound
  setNetInfo(state: NetInfoState) {
    this.netInfo = state;
    if (this.netInfo.isInternetReachable && this.hydrated) {
      this.run();
    }
  }

  /** Add a request to the end of the queue. Returns a cancel function. */
  @action
  add<A = any, D = any>(queueItem: QueueItem<A, D>) {
    // Create a cancel token.
    const cancelable = axios.CancelToken.source();

    this.queue.push({
      ...queueItem,
      started: Date.now(),
      attemptCount: 0,
      cancelToken: cancelable.token,
    });
    this.run();

    // Return cancel function.
    return cancelable.cancel;
  }

  /** Run the first request of the queue. */
  // eslint-disable-next-line complexity
  run = flow(function*(this: OfflineStore, skipBusyCheck?: boolean) {
    if (!this.netInfo.isInternetReachable) {
      this.busy = false;
      return;
    }
    // If skip is false, check if it's busy.
    if (!skipBusyCheck && (this.busy || this.queue.length === 0)) {
      return;
    }
    this.busy = true;

    // Get first in queue.
    const { request, cancelToken, attemptCount } = this.queue[0];

    try {
      const res: AxiosResponse = yield api({
        validateStatus: (status) => !this.retryStatus.includes(status),
        cancelToken,
        ...request,
      });

      // Call commit
      this.runFinish(true, res);

      return;
    } catch (error) {
      // Retry attempts exceeded.
      if (attemptCount >= this.retryMax) {
        // Call rollback
        this.runFinish(false, error.response);
        return;
      }

      // Retry with increasing delay.
      this.nextRunTime = this.retryTimeouts[attemptCount];
      this.queue[0].attemptCount = attemptCount + 1;

      // Run this again. Busy remains true so the next request on queue won't run.
      setTimeout(() => this.run(true), this.nextRunTime);
    }
  });

  @action
  private runFinish(didCommit: boolean, res: AxiosResponse) {
    // Remove and return first element from queue
    const {
      request,
      commit,
      rollback,
      passArgs,
      started,
      attemptCount,
    } = this.queue.shift()!;

    // Call commit or rollback.
    // Functions loaded from storage loses `this` reference, so
    // we pass `stores` to be able to access everything.
    if (didCommit && commit) {
      commit({ stores: this.stores, res, args: passArgs });
    } else if (rollback) {
      rollback({ stores: this.stores, res, args: passArgs });
    }

    // Add to history and limit array size
    this.history.unshift({
      request,
      attemptCount,
      status: res.status,
      didCommit,
      started,
      finished: Date.now(),
    });
    this.history = this.history.slice(0, this.historyMax);

    this.busy = false;
    this.nextRunTime = 0;
    this.run();
  }
}
