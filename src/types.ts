import {
  CreateNavigatorConfig,
  NavigationRouteConfigMap,
  NavigationStackRouterConfig,
} from 'react-navigation';
import { SharedElementsComponentConfig } from 'react-navigation-shared-element';
import {
  NavigationStackConfig,
  NavigationStackOptions,
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';

export type CustomNavigationProps = {
  sharedElements?: SharedElementsComponentConfig;
};

export type DefaultNavigationProps<
  P = {},
  S = {}
> = NavigationStackScreenComponent<P, S> & CustomNavigationProps;

export type DefaultRouteConfig = NavigationRouteConfigMap<
  NavigationStackOptions,
  NavigationStackProp
>;
export type DefaultStackConfig = CreateNavigatorConfig<
  NavigationStackConfig,
  NavigationStackRouterConfig,
  NavigationStackOptions,
  NavigationStackProp
>;

export interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageStatus: string;
  picture: string | null;
}
