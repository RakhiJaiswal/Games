import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';
import {Cross, Circle} from './assets/index';
import {Colors} from './consts';

let Xarray = [];
let Oarray = [];
const mockData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const disable = [false, false, false, false, false, false, false, false, false];
const winPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let winArray = [];

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [turn, setNextTurn] = useState('X');
  const [cell1, setCell1] = useState('');
  const [cell2, setCell2] = useState('');
  const [cell3, setCell3] = useState('');

  let hasWinner;

  useEffect(() => {
    setCount(count + 1);
    for (let i = 0; i < winPosition.length; i++) {
      if (turn === 'X') {
        hasWinner =
          Oarray.some(val => val === winPosition[i][0]) &&
          Oarray.some(val => val === winPosition[i][1]) &&
          Oarray.some(val => val === winPosition[i][2]);
      } else {
        hasWinner =
          Xarray.some(val => val === winPosition[i][0]) &&
          Xarray.some(val => val === winPosition[i][1]) &&
          Xarray.some(val => val === winPosition[i][2]);
      }
      if (hasWinner === true) {
        winArray = winPosition[i];
        console.log(winArray, 'winArray');
        let who = turn === 'X' ? '0' : 'X';
        Alert.alert('Winner is', who);
        disable.fill(true, 0, disable.length);
        break;
      }
    }
    if (count >= 9) {
      Alert.alert('Tie');
    }
  }, [turn]);
  useEffect(() => {
    setCell1(winArray[0]);
    setCell2(winArray[1]);
    setCell3(winArray[2]);
  }, [winArray]);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.gameName}>
        <Animatable.Text
          animation="lightSpeedOut"
          // iterationCount={'infinite'}
          direction="alternate-reverse">
          <Text style={styles.text1}>
            T<Text style={styles.text2}>I</Text>C
          </Text>
        </Animatable.Text>

        <Animatable.Text
          animation="bounceIn"
          //  iterationCount={'infinite'}
          direction="alternate">
          <Text style={styles.text1}>
            {' '}
            T<Text style={styles.text2}>A</Text>C{' '}
          </Text>
        </Animatable.Text>

        <Animatable.Text
          animation="lightSpeedIn"
          // iterationCount={'infinite'}
          direction="alternate">
          <Text style={styles.text1}>
            T<Text style={styles.text2}>O</Text>E
          </Text>
        </Animatable.Text>
      </View>

      <View style={styles.playersView}>
        <View
          style={{
            ...styles.tokenView,
            borderColor: turn === 'X' ? 'yellow' : Colors.blue,
            backgroundColor: turn === 'X' ? 'yellow' : 'transparent',
          }}>
          <Text
            style={{
              color: turn === 'X' ? 'black' : 'white',
              fontWeight: 'bold',
            }}>
            Player 1
          </Text>
          <Image style={styles.tokenImg} source={Cross} />
        </View>
        <View
          style={{
            ...styles.tokenView,
            borderColor: turn === 'O' ? 'yellow' : Colors.pink,
            backgroundColor: turn === 'O' ? 'yellow' : 'transparent',
          }}>
          <Text
            style={{
              color: turn === 'O' ? 'black' : 'white',
              fontWeight: 'bold',
            }}>
            Player 2
          </Text>
          <Image style={styles.tokenImg} source={Circle} />
        </View>
      </View>

      <View style={styles.container}>
        <Animatable.View
          animation="zoomIn"
          iterationCount={1}
          direction="alternate"
          style={styles.animatableView}>
          <FlatList
            contentContainerStyle={styles.boxView}
            bounces={false}
            data={mockData}
            numColumns={3}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  disabled={disable[index]}
                  onPress={() => {
                    mockData[index] = turn;
                    disable[index] = true;
                    turn === 'X' ? Xarray.push(index) : Oarray.push(index);
                    setNextTurn(turn === 'X' ? 'O' : 'X');
                  }}
                  activeOpacity={1}
                  style={{
                    ...styles.cell,
                    backgroundColor:
                      cell1 === index || cell2 === index || cell3 === index
                        ? 'yellow'
                        : 'transparent',
                  }}>
                  {item !== 'X' ? (
                    item !== 'O' ? null : (
                      <Animatable.View
                        animation="bounceIn"
                        iterationCount={1}
                        direction="alternate">
                        <Image style={styles.img} source={Circle} />
                      </Animatable.View>
                    )
                  ) : (
                    <Animatable.View
                      animation="bounceIn"
                      iterationCount={1}
                      direction="alternate">
                      <Image style={styles.img} source={Cross} />
                    </Animatable.View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

export default TicTacToe;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: Colors.purple},
  gameName: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text1: {
    color: Colors.pink,
    fontSize: ResponsiveSize(60),
    fontWeight: 'bold',
  },
  text2: {color: Colors.blue},
  playersView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: ResponsiveSize(50),
  },
  tokenView: {
    backgroundColor: 'yellow',
    width: ResponsiveSize(120),
    aspectRatio: 1,
    borderRadius: ResponsiveSize(30),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 2,
  },
  tokenImg: {height: ResponsiveSize(50), aspectRatio: 1},
  container: {
    flex: 1,
    alignItems: 'center',
  },
  boxView: {
    borderWidth: ResponsiveSize(4),
    borderColor: 'white',
    borderStyle: 'dotted',
    borderRadius: ResponsiveSize(20),
    padding: ResponsiveSize(30),
  },
  animatableView: {marginTop: ResponsiveSize(100)},
  cell: {
    aspectRatio: 1,
    height: ResponsiveSize(120),
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ResponsiveSize(20),
  },
  img: {height: ResponsiveSize(90), width: ResponsiveSize(90)},
});
