import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DefaultNavigationProps } from '!/types';

type Params = {};

type ScreenProps = {};

const Chat: DefaultNavigationProps<Params, ScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Chat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Chat.navigationOptions = {
  title: 'Chat',
};

export default Chat;
