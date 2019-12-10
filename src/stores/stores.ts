import { StatusBar } from 'react-native';

import { DarkTheme, DefaultTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { autorun, configure, flow, observable } from 'mobx';
import { create } from 'mobx-persist';

import GeneralStore from '!/stores/general';
import OfflineStore from '!/stores/offline';
import UserStore from '!/stores/user';
import { parse, stringify } from '!/utils/json';

configure({ enforceActions: 'observed' });

export default class Stores {
  general: GeneralStore;
  offline: OfflineStore;
  user: UserStore;

  @observable
  hydrationComplete = false;

  constructor() {
    this.general = new GeneralStore(this);
    this.offline = new OfflineStore(this);
    this.user = new UserStore(this);

    autorun(() => {
      if (this.hydrationComplete) {
        StatusBar.setBackgroundColor(
          this.general.isDarkTheme
            ? DarkTheme.colors.background
            : DefaultTheme.colors.primary,
          true,
        );
        StatusBar.setBarStyle('light-content', true);
      }
    });
  }

  hydrate = flow(function*(this: Stores) {
    const hydrate = create({
      storage: AsyncStorage,
      jsonify: true,
      stringify,
      parse,
    });

    yield hydrate('general', this.general);
    yield hydrate('offline', this.offline);
    yield hydrate('user', this.user);

    this.offline.hydrationComplete();

    this.hydrationComplete = true;
  });

  purge = flow(function*(this: Stores, storeName: string) {
    yield AsyncStorage.removeItem(storeName);
  });

  purgeAll = flow(function*(this: Stores) {
    yield this.purge('general');
    yield this.purge('offline');
    yield this.purge('user');
  });
}
