import React from 'react';
import {View, Text} from 'react-native';

const Lobby = ({usersArray}) => {
  return (
    <View>
      <Text> users joined </Text>
      {usersArray?.length > 0 && usersArray.map(item => <Text>{item.id}</Text>)}
    </View>
  );
};

export default Lobby;
