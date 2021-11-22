import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import ProfileScreen from './ProfileScreen';
import {TicTacToeGame, BingoGame} from './../../../assets/index';
import {useSelector} from 'react-redux';
const mockData = [
  {
    name: 'Tic Tac Toe',
    image: TicTacToeGame,
  },
  {
    name: 'BINGO',
    image: BingoGame,
  },
];
const MenuScreen = ({navigation}) => {
  console.log(useSelector(state => state.UserDetailsReducer));
  return (
    <SafeAreaView>
      <Text>Welcome</Text>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <FlatList
          contentContainerStyle={styles.boxView}
          bounces={false}
          data={mockData}
          renderItem={({item, index}) => {
            return (
              <View style={{}}>
                <ImageBackground
                  source={item.image}
                  resizeMode="contain"
                  style={styles.image}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('TicTacToe');
                    }}>
                    <Text> {item.name}</Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            );
          }}
        />
      </View>

      <TouchableOpacity>
        <Text> Bingo </Text>
      </TouchableOpacity>
      <ProfileScreen />
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 200,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
