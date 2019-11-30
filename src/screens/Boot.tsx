import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import BootSplash from 'react-native-bootsplash';

import { DefaultNavigationProps } from '!/types';

type Props = {
  navigation: DefaultNavigationProps<'Boot'>;
};

const Boot = ({ navigation }: Props): JSX.Element => {
  const [isImageReady, setIsImageReady] = useState(false);

  const handleLoadEnd = (): void => setIsImageReady(true);

  useEffect(() => {
    if (isImageReady) {
      BootSplash.hide();
      setTimeout(() => {
        navigation.replace('Home', undefined);
      }, 3000);
    }
  }, [isImageReady, navigation]);

  return (
    <View style={styles.container}>
      <Image
        fadeDuration={0}
        source={require('../assets/react_logo.png')}
        onLoadEnd={handleLoadEnd}
      />
    </View>
  );
};

const bgColor = '#04B6B8';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor,
  },
});

export default Boot;
