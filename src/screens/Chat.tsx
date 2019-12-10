import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { useTheme } from 'react-native-paper';

import ConversationItem from '!/components/ConversationItem';
import { fakeConversation } from '!/data/fake';
import { Conversation, DefaultNavigationProps } from '!/types';

type Params = {};

type ScreenProps = {};

const Chat: DefaultNavigationProps<Params, ScreenProps> = () => {
  const { colors } = useTheme();

  const keyExtractor = (item: Conversation) => {
    return item.id;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={fakeConversation}
        keyExtractor={keyExtractor}
        renderItem={(props) => <ConversationItem {...props} />}
      />
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
