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
      <TouchableOpacity>
        <Text> Bingo </Text>
      </TouchableOpacity>
      <ProfileScreen />
    </SafeAreaView>
  );
};

export default MenuScreen;
