import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

import Stores from '!/stores/stores';

export default class GeneralStore {
  private stores: Stores;

  @persist
  @observable
  isDarkTheme = false;

  constructor(stores: Stores) {
    this.stores = stores;
  }

  @action
  toggleTheme = (): void => {
    this.isDarkTheme = !this.isDarkTheme;
  };
}
