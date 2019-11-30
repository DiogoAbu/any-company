import { StackNavigationProp } from '@react-navigation/stack';

// Name of the routes
export enum RouteName {
  Boot = 'Boot',
  Home = 'Home',
}

// Parameters for the routes above
export type ParamList = {
  default: {} | undefined;
  Boot: {} | undefined;
  Home: {} | undefined;
};

// Returns ParamList of the specified Route
export type DefaultNavigationProps<
  Name extends keyof ParamList
> = StackNavigationProp<ParamList, Name>;

export enum ThemeType {
  Light = 'Light',
  Dark = 'Dark',
}
