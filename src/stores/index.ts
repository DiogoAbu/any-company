import { createContext } from 'react';

import Stores from '!/stores/stores';

export { default as GeneralStore } from '!/stores/general';
export { default as UserStore } from '!/stores/user';
export { default as OfflineStore } from '!/stores/offline';
export { default as Stores } from '!/stores/stores';

export default createContext(new Stores());
