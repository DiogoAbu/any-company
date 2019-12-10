import React, { FC } from 'react';

import { Appbar } from 'react-native-paper';
import { HeaderProps } from 'react-navigation-stack';

const Header: FC<HeaderProps> = ({ navigation, scene, previous }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={handleBack} /> : null}
      <Appbar.Content title={scene.descriptor.options.title} />
    </Appbar.Header>
  );
};

export default Header;
