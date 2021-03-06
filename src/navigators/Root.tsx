import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import AccountStack from '!/navigators/AccountStack';
import ChatStack from '!/navigators/ChatStack';
import HomeStack from '!/navigators/HomeStack';
import ProjectsStack from '!/navigators/ProjectsStack';

const Navigator = createMaterialBottomTabNavigator(
  {
    HomeStack,
    ProjectsStack,
    ChatStack,
    AccountStack,
  },
  {
    initialRouteName: 'HomeStack',
  },
);

export default createAppContainer(Navigator);
