import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {useSelector} from 'react-redux';
import {socket} from '../../../../App';
import BackButton from '../commonComponents/BackButton';
import Lobby from './Lobby';

const CreateCode = ({changeScreen}) => {
  const [joinCode, setJoinCode] = useState(null);
  const [room, setRoom] = useState();
  const userName = useSelector(
    state => state.UserDetailsReducer.userData.displayName,
  );
  useEffect(() => {
    if (joinCode === null) {
      setJoinCode(Math.floor(100000 + Math.random() * 900000));
    }
  }, []);

  useEffect(() => {
    // console.log('username000', userName);
    socket.emit('createGame', {
      gameName: 'Bingo',
      joinCode: joinCode,
      name: userName,
    });
  }, [joinCode]);

  const createGameResponse = data => {
    // console.log('data room  listen', data);
    setRoom(data);
  };
  socket.on('checkCode', data => setRoom(data));
  useEffect(() => {
    return () => {
      socket.off('checkCode', data => {
        setRoom(data);
      });
    };
  }, []);
  useEffect(() => {
    socket.on('createGame', createGameResponse);
    return () => {
      socket.off('createGame', createGameResponse);
    };
  }, []);
  return (
    <View>
      <View style={{height: 100}}>
        <BackButton />
      </View>
      <Text> JOIN CODE IS {joinCode} </Text>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(`whatsapp://send?text=JoinCode is ${joinCode}`)
        }>
        <Text> send code </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => socket.emit('startGame')}>
        <Text> Start Game </Text>
      </TouchableOpacity>
      <Lobby usersArray={room?.users} />
    </View>
  );
};

export default CreateCode;
