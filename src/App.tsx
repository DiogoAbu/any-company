import 'react-native-gesture-handler';

import React from 'react';

import {
  DarkTheme,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { useScreens } from 'react-native-screens';
import { useObserver } from 'mobx-react-lite';

import useStores from '!/hooks/use-stores';
import AppContainer from '!/navigators/Root';
import { setRootNavigator } from '!/utils/navigation';

useScreens();

const App: React.FC = () => {
  const { general } = useStores();

  const setRootNavigatorRef = (ref: any) => {
    setRootNavigator(ref);
  };

  return useObserver(() => (
    <PaperProvider theme={general.isDarkTheme ? DarkTheme : DefaultTheme}>
      <AppContainer
        ref={setRootNavigatorRef}
        screenProps={{ theme: general.isDarkTheme ? 'dark' : 'light' }}
        theme={general.isDarkTheme ? 'dark' : 'light'}
      />
    </PaperProvider>
  ));
};

export default App;
