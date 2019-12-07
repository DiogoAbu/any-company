import React from 'react';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '!/components/TabBarIcon';
import Boot from '!/screens/Boot';
import Home from '!/screens/Home';

const HomeStack = createSharedElementStackNavigator(
  createStackNavigator,
  {
    Boot,
    Home,
  },
  {
    // Start at Boot screen
    initialRouteName: 'Boot',
    // Does not show tabBar at Boot screen
    initialRouteParams: {
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    // Navigation options for the navigator itself
    navigationOptions: ({ navigation }) => {
      let options = {
        tabBarVisible: true,
        // Tab bar label and icon
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused, horizontal }) => (
          <TabBarIcon
            color={tintColor}
            focused={focused}
            horizontal={horizontal}
            name='home'
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

export default HomeStack;
