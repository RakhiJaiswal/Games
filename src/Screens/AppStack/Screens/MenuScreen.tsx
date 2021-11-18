import React from 'react';
import {View, Text, SafeAreaView, Modal, TouchableOpacity} from 'react-native';
import ProfileScreen from './ProfileScreen';

const MenuScreen = ({navigation}) => {
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
    </SafeAreaView>
  );
};

export default MenuScreen;
