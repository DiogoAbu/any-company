import React, { FC } from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';

import { Avatar, List } from 'react-native-paper';

import useNavigation from '!/hooks/use-navigation';
import { Conversation } from '!/types';
import getInitials from '!/utils/get-initials';

type Props = ListRenderItemInfo<Conversation>;

const ConversationItem: FC<Props> = ({ item }) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate('ChatConversation', { id: item.id });
  };

  return (
    <List.Item
      description={item.lastMessage}
      left={(props) => (
        <Avatar.Text
          {...props}
          label={getInitials(item.name)}
          size={48}
          style={[props.style, styles.avatar]}
        />
      )}
      title={item.name}
      onPress={handleOnPress}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    marginTop: 12,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 6,
  },
});

export default ConversationItem;
