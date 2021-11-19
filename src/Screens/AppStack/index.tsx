import React from 'react';
import MenuScreen from './Screens/MenuScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from './Screens/ProfileScreen';
import TicTacToe from '../Games/TicTacToe';
import Bingo from '../Games/Bingo';
import SnakesLadder from '../Games/SnakesLadder';
import SKLocalMultiplayer from '../Games/SnakesLadder/LocalMultiplayer';

const AppStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={MenuScreen}
      screenOptions={{
        gestureEnabled: true,
        animation: 'slide_from_right',
        headerShown: false,
      }}>
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{
          orientation: 'portrait',
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          orientation: 'portrait',
        }}
      />
      <Stack.Screen
        name="TicTacToe"
        component={TicTacToe}
        options={{
          orientation: 'portrait',
        }}
      />

      <Stack.Screen
        name="Bingo"
        component={Bingo}
        options={{
          orientation: 'portrait',
        }}
      />
      <Stack.Screen
        name="SnakesLadder"
        component={SnakesLadder}
        options={{
          orientation: 'portrait',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
