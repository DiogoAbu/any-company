import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DefaultNavigationProps } from '!/types';

type Params = {};

type ScreenProps = {};

const Account: DefaultNavigationProps<Params, ScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Account.navigationOptions = {
  title: 'Account',
};

export default Account;
