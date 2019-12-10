import { useContext } from 'react';

import StoresContext from '!/stores';

export default function useStores() {
  return useContext(StoresContext);
}
