import React from 'react';

import { DarkTheme, DefaultTheme } from 'react-native-paper';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createStackNavigator } from 'react-navigation-stack';

import Header from '!/components/Header';
import TabBarIcon from '!/components/TabBarIcon';
import Projects from '!/screens/Projects';
import { DefaultRouteConfig, DefaultStackConfig } from '!/types';

const ProjectsStack = createSharedElementStackNavigator<
  DefaultRouteConfig,
  DefaultStackConfig,
  {}
>(
  createStackNavigator,
  {
    Projects,
  },
  {
    // Start at Boot screen
    initialRouteName: 'Projects',
    defaultNavigationOptions: ({ screenProps }: any) => ({
      header: Header,
      cardStyle: {
        backgroundColor: (screenProps.theme === 'dark'
          ? DarkTheme
          : DefaultTheme
        ).colors.background,
      },
    }),
    // Navigation options for the navigator itself
    navigationOptions: ({ navigation }) => {
      let options = {
        tabBarVisible: true,
        // Tab bar label and icon
        tabBarLabel: 'Projects',
        tabBarIcon: ({ tintColor, focused, horizontal }: any) => (
          <TabBarIcon
            color={tintColor}
            focused={focused}
            horizontal={horizontal}
            name='view-grid'
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

export default ProjectsStack;
