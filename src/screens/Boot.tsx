import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import BootSplash from 'react-native-bootsplash';
import { SharedElement } from 'react-navigation-shared-element';

import useStores from '!/hooks/use-stores';
import { DefaultNavigationProps } from '!/types';

type Params = {};

type ScreenProps = {};

const Boot: DefaultNavigationProps<Params, ScreenProps> = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false);
  const [isImageReady, setIsImageReady] = useState(false);

  const stores = useStores();

  // Hydrate stores
  useEffect(() => {
    (async () => {
      await stores.hydrate();
      setIsReady(true);
    })();
  }, [stores]);

  // Image is done loading
  const handleImageLoadEnd = () => {
    setIsImageReady(true);
  };

  useEffect(() => {
    if (isImageReady) {
      BootSplash.hide();

      // Load what you need here and them navigate to Home
      if (isReady) {
        requestAnimationFrame(() => {
          navigation.replace('Home');
        });
      }
    }
  }, [isImageReady, isReady, navigation]);

  return (
    <View style={styles.container}>
      <SharedElement id='logo'>
        <Image
          fadeDuration={0}
          source={require('../assets/logo/ic_launcher.png')}
          onLoadEnd={handleImageLoadEnd}
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
