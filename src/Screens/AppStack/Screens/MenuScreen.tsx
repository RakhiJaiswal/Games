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
  Image,
} from 'react-native';
import ProfileScreen from './ProfileScreen';
import * as Animatable from 'react-native-animatable';
import {TicTacToeGame, BingoGame} from './../../../assets/index';
import {useSelector} from 'react-redux';
const mockData = [
  {
    name: 'Tic Tac\n Toe',
    image: TicTacToeGame,
    navigate: 'TicTacToe',
  },
  {
    name: 'BINGO',
    image: BingoGame,
    navigate: 'Bingo',
  },
];
const MenuScreen = ({navigation}) => {
  console.log(useSelector(state => state.UserDetailsReducer));
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
        <Animatable.Text
          animation="bounceIn"
          iterationCount={'infinite'}
          direction="alternate-reverse">
          <Text
            style={{
              fontSize: 35,
              fontWeight: '900',
              shadowColor: 'green',
              shadowOffset: {width: 0, height: 10},
              shadowOpacity: 1,
              color: 'red',
              fontStyle: 'italic',
            }}>
            2 PLAYER GAMES
          </Text>
        </Animatable.Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          backgroundColor: 'white',
          marginTop: 20,
        }}>
        <FlatList
          contentContainerStyle={styles.boxView}
          bounces={false}
          data={mockData}
          renderItem={({item, index}) => {
            return (
              <View style={{marginHorizontal: 15}}>
                <TouchableOpacity
                  style={{
                    // borderWidth: 5,
                    margin: 10,
                    height: 150,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    shadowColor: 'rgb(57,27,151)',
                    shadowOffset: {width: 0, height: 10},
                    shadowOpacity: 1,
                    shadowRadius: 1,
                    borderRadius: 40,
                    backgroundColor: 'rgb(57,27,151)',
                  }}
                  activeOpacity={1}
                  onPress={() => {
                    navigation.navigate(item.navigate);
                  }}>
                  <Text
                    style={{
                      marginHorizontal: 15,
                      fontSize: 35,
                      fontWeight: '900',
                      shadowColor: 'green',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 1,
                      color: 'red',
                      shadowRadius: 1,
                      borderRadius: 40,
                      fontStyle: 'italic',
                    }}>
                    {item.name}
                  </Text>
                  <Image
                    source={item.image}
                    style={{
                      height: 80,
                      width: 150,
                      transform: [{rotate: '40deg'}],
                      marginHorizontal: 15,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
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
  boxView: {},
});
