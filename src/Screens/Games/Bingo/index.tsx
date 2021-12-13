import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import CreateOrJoin from './CreateOrJoin';
import CreateCode from './CreateCode';
import JoinCode from './JoinCode';
import Game from './Game';
import End from './End';
import {socket} from '../../../../App';

const Bingo = () => {
  const [screen, setScreen] = useState('CreateOrJoin');
  const [winner, setWinner] = useState();

  const [room, setRoom] = useState();
  const startGameResponse = data => {
    console.log('data start game ', data);

    setRoom(data);
    data.gameState.status === 'Playing' && setScreen('Game');
  };

  useEffect(() => {
    socket.on('startGame', startGameResponse);
    return () => {
      socket.off('startGame', startGameResponse);
    };
  }, []);

  const onWinnerSocketResponse = data => {
    console.log('inside  winne socket', data);
    data.gameState.status === 'EndGame' && setScreen('End');
    setWinner(data.winner);
  };

  useEffect(() => {
    socket.on('winner', onWinnerSocketResponse);
    return () => {
      socket.off('winner', onWinnerSocketResponse);
    };
  }, []);

  const changeScreen = (changeTo: string) => {
    setScreen(changeTo);
  };

  const display = () => {
    switch (screen) {
      case 'CreateOrJoin':
        return <CreateOrJoin changeScreen={changeScreen} />;
      case 'CreateCode':
        return <CreateCode changeScreen={changeScreen} />;
      case 'JoinCode':
        return <JoinCode />;
      case 'Game':
        return (
          <Game changeScreen={changeScreen} room={room} setRoom={setRoom} />
        );
      case 'End':
        return <End winner={winner} />;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'pink'}}>
      <StatusBar barStyle={'light-content'} />
      {display()}
    </SafeAreaView>
  );
};

export default Bingo;
