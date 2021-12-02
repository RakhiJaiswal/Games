import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CreateOrJoin = ({changeScreen}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => changeScreen('CreateCode')}>
        <Text> Create Room </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => changeScreen('JoinCode')}>
        <Text> Join Room </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateOrJoin;
