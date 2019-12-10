import React, { FC } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  color?: string;
  name: string;
  focused?: boolean;
  horizontal?: boolean;
};

const TabBarIcon: FC<Props> = ({ color, name }) => {
  return <Icon color={color} name={name} size={24} />;
};

export default TabBarIcon;
