import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import BootSplash from 'react-native-bootsplash';
import { SharedElement } from 'react-navigation-shared-element';

import { DefaultNavigationProps } from '!/types';

type Params = {};

type ScreenProps = {};

const Boot: DefaultNavigationProps<Params, ScreenProps> = ({ navigation }) => {
  const [isImageReady, setIsImageReady] = useState(false);

  // Image is done loading
  const handleLoadEnd = () => setIsImageReady(true);

  useEffect(() => {
    if (isImageReady) {
      BootSplash.hide();

      // Load what you need here and them navigate to Home
      setTimeout(() => {
        requestAnimationFrame(() => {
          navigation.replace('Home');
        });
      }, 3000);
    }
  }, [isImageReady, navigation]);

  return (
    <View style={styles.container}>
      <SharedElement id='logo'>
        <Image
          fadeDuration={0}
          source={require('../assets/logo/ic_launcher.png')}
          onLoadEnd={handleLoadEnd}
        />
      </SharedElement>
    </View>
  );
};

const bgColor = '#fff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor,
  },
});

Boot.navigationOptions = {
  header: null,
};

Boot.sharedElements = () => {
  return [{ id: 'logo' }];
};

export default Boot;
