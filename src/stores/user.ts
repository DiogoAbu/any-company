import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

import Stores from '!/stores/stores';
import { setAuthorizationToken } from '!/utils/api';

export default class UserStore {
  private stores: Stores;

  @persist
  @observable
  user: string;

  @persist
  @observable
  token: string;

  constructor(stores: Stores) {
    this.stores = stores;
  }

  @action
  signIn(user: string) {
    this.user = user;

    setAuthorizationToken(this.user);
  }

  @action
  getInfo(_status: number) {
    const passArgs = {
      oldUser: this.user,
    };

    this.signIn('optimistic');

    this.stores.offline.add({
      request: {
        url: '',
        baseURL: 'https://jsonplaceholder.typicode.com/users/100',
      },
      passArgs,
      commit({ stores, res, args }) {
        if (res.data && res.data.name) {
          stores.user.signIn(res.data.name);
          return;
        }
        stores.user.signIn(args.oldUser);
      },
      rollback({ stores, res, args }) {
        if (res.data && res.data.name) {
          stores.user.signIn(res.data.name);
          return;
        }
        stores.user.signIn(args.oldUser);
      },
    });
  }
}
