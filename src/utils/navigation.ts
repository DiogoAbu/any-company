import { NavigationActions } from 'react-navigation';

let navigatorRef;

export function setRootNavigator(ref) {
  navigatorRef = ref;
}

export function rootNavigate(routeName: string, params?: {}) {
  navigatorRef.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}
