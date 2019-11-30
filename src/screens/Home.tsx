import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DefaultNavigationProps } from '!/types';

type Props = {
  navigation: DefaultNavigationProps<'Home'>;
};

const Home = (_props: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default Home;
