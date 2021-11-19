import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet,
} from 'react-native';
import {Colors} from '../TicTacToe/consts';
import LocalMultiplayer from './LocalMultiplayer';

import Menu from './Menu';
const SnakesLadder = ({navigation}) => {
  const [screen, setScreen] = useState('menu');
  const changeScreen = () => {
    screen === 'menu' ? setScreen('game') : setScreen('menu');
  };

  const display = () => {
    switch (screen) {
      case 'menu':
        return <Menu changeScreen={() => changeScreen()} />;
      case 'game':
        return <LocalMultiplayer changeScreen={() => changeScreen()} />;
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.purple}}>
      <StatusBar barStyle={'light-content'} />
      {display()}
    </SafeAreaView>
  );
};

export default SnakesLadder;
