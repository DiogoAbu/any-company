import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { SharedElement } from 'react-navigation-shared-element';

import { DefaultNavigationProps } from '!/types';

type Params = {};

type ScreenProps = {};

const Home: DefaultNavigationProps<Params, ScreenProps> = () => {
  return (
    <View style={styles.container}>
      <SharedElement id='logo'>
        <Image
          fadeDuration={0}
          source={require('../assets/logo/ic_launcher.png')}
        />
      </SharedElement>
    </View>
  );
};

const bgColor = '#fff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    padding: 24,
  },
});

Home.navigationOptions = {
  title: 'Home',
};

export default Home;
