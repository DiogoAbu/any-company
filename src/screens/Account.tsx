import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { List, Switch, useTheme } from 'react-native-paper';
import { useObserver } from 'mobx-react-lite';

import useStores from '!/hooks/use-stores';
import { DefaultNavigationProps } from '!/types';

type Params = {};

type ScreenProps = {};

const Account: DefaultNavigationProps<Params, ScreenProps> = () => {
  const { general } = useStores();
  const { colors, dark } = useTheme();

  return useObserver(() => (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <List.Section>
        <List.Subheader>General</List.Subheader>
        <List.Item
          right={() => (
            <Switch
              value={dark}
              onValueChange={() => {
                general.toggleTheme();
              }}
            />
          )}
          title='Use dark theme'
        />
      </List.Section>
    </ScrollView>
  ));
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

Account.navigationOptions = {
  title: 'Account',
};

export default Account;
