import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, useTheme } from 'react-native-paper';

import useNavigation from '!/hooks/use-navigation';
import { DefaultNavigationProps } from '!/types';

type Params = {
  id: string;
};

type ScreenProps = {};

const ChatConversation: DefaultNavigationProps<Params, ScreenProps> = () => {
  const { getParam } = useNavigation();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text>ChatConversation {getParam('id')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

ChatConversation.navigationOptions = ({ navigation: { getParam } }) => ({
  title: getParam('id', 'Conversation'),
});

export default ChatConversation;
