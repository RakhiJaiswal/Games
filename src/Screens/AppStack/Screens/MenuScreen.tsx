import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import ProfileScreen from './ProfileScreen';
import * as Animatable from 'react-native-animatable';
import {
  TicTacToeGame,
  BingoGame,
  SnakeLadder,
  profileIcon,
} from '../../../assets/images';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';

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
  {
    name: 'Snakes \nLadder',
    image: SnakeLadder,
    navigate: 'SnakesLadder',
  },
  {
    name: 'Sumo',
    image: SnakeLadder,
    navigate: 'Sumo',
  },
];
const MenuScreen = ({navigation}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const photoURL = useSelector(
    state => state.UserDetailsReducer.userData.photoURL,
  );
  const profile_image = photoURL === undefined ? profileIcon : {uri: photoURL};

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <TouchableOpacity
          onPress={() => setIsModalOpen(true)}
          style={{
            width: ResponsiveSize(42),
            height: ResponsiveSize(42),
            alignSelf: 'flex-end',
            marginRight: ResponsiveSize(30),
          }}>
          <Image
            source={profile_image}
            style={{
              height: ResponsiveSize(40),
              width: ResponsiveSize(40),
              borderRadius: ResponsiveSize(20),
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Animatable.View
            animation="bounceIn"
            iterationCount={'infinite'}
            direction="alternate-reverse">
            <Text
              style={{
                fontSize: 35,
                fontWeight: '900',
                shadowColor: 'green',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 1,
                color: 'red',
                fontStyle: 'italic',
                elevation: 999,
              }}>
              2 PLAYER GAMES
            </Text>
          </Animatable.View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            backgroundColor: 'white',
            marginTop: 20,
          }}>
          <FlatList
            contentContainerStyle={styles.boxView}
            // bounces={false}
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
      </View>

      <Modal
        isVisible={isModalOpen}
        backdropColor="rgba(0,0,0, 0.8)"
        backdropOpacity={0.8}
        // animationIn="zoomInDown"
        // animationOut="zoomOutUp"
        // animationInTiming={600}
        // animationOutTiming={600}
        // backdropTransitionInTiming={600}
        //</SafeAreaView>backdropTransitionOutTiming={600}
      >
        <ProfileScreen setIsModalOpen={setIsModalOpen} />
      </Modal>
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
