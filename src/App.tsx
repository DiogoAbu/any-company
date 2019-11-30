import 'react-native-gesture-handler';

import React from 'react';

import { useScreens } from 'react-native-screens';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Boot from '!/screens/Boot';
import Home from '!/screens/Home';
import { ParamList, RouteName } from '!/types';

useScreens();

const Stack = createStackNavigator<ParamList>();

const App = (): JSX.Element => {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator initialRouteName='Boot'>
        <Stack.Screen
          component={Boot}
          name={RouteName.Boot}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Home}
          name={RouteName.Home}
          options={{ title: 'Home' }}
        />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
};

export default App;
