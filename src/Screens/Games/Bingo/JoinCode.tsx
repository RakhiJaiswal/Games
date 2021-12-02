import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import {socket} from '../../../../App';
import BackButton from '../commonComponents/BackButton';
import Lobby from './Lobby';

const JoinCode = () => {
  const [showLobby, setShowLobby] = useState(false);
  const [code, setCode] = useState();
  const [usersArray, setUsersArray] = useState([]);

  const checkCodeSocketResponse = data => {
    console.log(data, 'data ');
    data.roomExist === true
      ? (setShowLobby(true), setUsersArray(data.users))
      : Alert.alert("check join code , room doesn't exist ");
  };
  useEffect(() => {
    socket.on('checkCode', checkCodeSocketResponse);
    return () => socket.off('checkCode', checkCodeSocketResponse);
  }, []);
  return (
    <View>
      <View style={{height: 100}}>
        <BackButton />
      </View>
      <TextInput
        style={{borderWidth: 1}}
        value={code}
        onChangeText={e => {
          setCode(e);
          console.log(e, 'e');
        }}
      />
      <TouchableOpacity
        onPress={() => {
          socket.emit('checkCode', {code: code});
        }}>
        <Text> Join </Text>
      </TouchableOpacity>
      {showLobby && <Lobby usersArray={usersArray} />}
    </View>
  );
};

export default JoinCode;
