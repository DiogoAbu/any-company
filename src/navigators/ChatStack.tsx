import React from 'react';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '!/components/TabBarIcon';
import Chat from '!/screens/Chat';

const ChatStack = createSharedElementStackNavigator(
  createStackNavigator,
  {
    Chat,
  },
  {
    // Start at Boot screen
    initialRouteName: 'Chat',
    // Navigation options for the navigator itself
    navigationOptions: ({ navigation }) => {
      let options = {
        tabBarVisible: true,
        // Tab bar label and icon
        tabBarLabel: 'Chat',
        tabBarIcon: ({ tintColor, focused, horizontal }) => (
          <TabBarIcon
            color={tintColor}
            focused={focused}
            horizontal={horizontal}
            name='message-reply-text'
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

export default ChatStack;
