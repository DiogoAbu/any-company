import { SharedElementsComponentConfig } from 'react-navigation-shared-element';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

export type CustomNavigationProps = {
  sharedElements?: SharedElementsComponentConfig;
};

export type DefaultNavigationProps<
  P = {},
  S = {}
> = NavigationStackScreenComponent<P, S> & CustomNavigationProps;
