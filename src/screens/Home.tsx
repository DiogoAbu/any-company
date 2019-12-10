import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { useTheme } from 'react-native-paper';
import { SharedElement } from 'react-navigation-shared-element';

import { DefaultNavigationProps } from '!/types';

type Params = {};

type ScreenProps = {};

const Home: DefaultNavigationProps<Params, ScreenProps> = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SharedElement id='logo'>
        <Image
          fadeDuration={0}
          source={require('../assets/logo/ic_launcher.png')}
        />
      </SharedElement>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

Home.navigationOptions = {
  title: 'Home',
};

export default Home;
