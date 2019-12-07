import 'react-native-gesture-handler';

import React from 'react';

import { Provider as PaperProvider } from 'react-native-paper';
import { useScreens } from 'react-native-screens';

import { setRootNavigator } from '!/helpers/navigation';
import AppContainer from '!/navigators/Root';

useScreens();

const App: React.FC = () => {
  const setRef = (ref) => {
    setRootNavigator(ref);
  };

  return (
    <PaperProvider>
      <AppContainer ref={setRef} />
    </PaperProvider>
  );
};

export default App;
