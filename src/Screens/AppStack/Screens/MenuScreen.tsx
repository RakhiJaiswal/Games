import React from 'react';
import {View, Text, SafeAreaView, Modal, TouchableOpacity} from 'react-native';
import ProfileScreen from './ProfileScreen';
import {useSelector} from 'react-redux';
const MenuScreen = ({navigation}) => {
  console.log(useSelector(state => state.UserDetailsReducer));
  return (
    <SafeAreaView>
      <Text>Welcome</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TicTacToe');
        }}>
        <Text> TIC TAC TOE </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Bingo');
        }}>
        <Text> Bingo </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SnakesLadder');
        }}>
        <Text> snakes and Ladder </Text>
      </TouchableOpacity>
      <ProfileScreen />
    </SafeAreaView>
  );
};

export default MenuScreen;
