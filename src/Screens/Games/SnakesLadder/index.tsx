import React, {useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import LocalMultiplayer from './LocalMultiplayer';
import Menu from './Menu';

const SnakesLadder = () => {
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
    <SafeAreaView style={{flex: 1, backgroundColor: 'darkGreen'}}>
      <StatusBar barStyle={'light-content'} />
      {display()}
    </SafeAreaView>
  );
};

export default SnakesLadder;
