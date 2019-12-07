import React from 'react';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '!/components/TabBarIcon';
import Account from '!/screens/Account';

const AccountStack = createSharedElementStackNavigator(
  createStackNavigator,
  {
    Account,
  },
  {
    // Start at Boot screen
    initialRouteName: 'Account',
    // Navigation options for the navigator itself
    navigationOptions: ({ navigation }) => {
      let options = {
        tabBarVisible: true,
        // Tab bar label and icon
        tabBarLabel: 'Account',
        tabBarIcon: ({ tintColor, focused, horizontal }) => (
          <TabBarIcon
            color={tintColor}
            focused={focused}
            horizontal={horizontal}
            name='account'
          />
        ),
      };

      // Get current route options
      if (navigation.state.routes) {
        const route = navigation.state.routes[navigation.state.index];
        if (route && route.params) {
          options = { ...options, ...route.params.navigationOptions };
        }
      }

      return options;
    },
  },
);

export default AccountStack;
