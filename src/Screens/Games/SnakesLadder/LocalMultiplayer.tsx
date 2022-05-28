import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Animated,
  Easing,
  Pressable,
} from 'react-native';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';
import {
  longLadder,
  pinkSnake,
  shortLadder,
  blueSnake,
  greenSnake,
  largeSnake,
  dice1,
  dice2,
  dice3,
  dice4,
  dice5,
  dice6,
} from './assets/images';
import Menu from '../commonComponents/Menu';

const LocalMultiplayer = ({changeScreen}) => {
  let data = [];
  const [number, setNumber] = useState(1);
  const [currentPosition1, setCurrentPosition1] = useState(1);
  const [currentPosition2, setCurrentPosition2] = useState(1);
  const [chance1, setChance1] = useState(false);
  const diceArray = [dice1, dice2, dice3, dice4, dice5, dice6];

  const SLArray = [
    {img: longLadder, style: styles.ladder1},
    {img: shortLadder, style: styles.ladder2},
    {img: shortLadder, style: styles.ladder3},
    {img: shortLadder, style: styles.ladder4},
    {img: shortLadder, style: styles.ladder5},
    {img: greenSnake, style: styles.snakes1},
    {img: pinkSnake, style: styles.snakes2},
    {img: greenSnake, style: styles.snakes3},
    {img: blueSnake, style: styles.snakes5},
    {img: pinkSnake, style: styles.snakes4},
    {img: largeSnake, style: styles.snakes6},
  ];
  const reset = () => {
    setNumber(1);
    setCurrentPosition1(1);
    setCurrentPosition2(1);
    setChance1(false);
  };
  const onBtnPress = () => {
    reset();
    changeScreen();
  };
  const shakeValue = useRef(new Animated.Value(0));

  const interpolated = shakeValue.current.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -20, 0, 20, 0, -20, 0],
  });
  const shakeFunction = () => {
    shakeValue.current.setValue(0);
    Animated.timing(shakeValue.current, {
      toValue: 3,
      duration: 400,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const key = chance1 ? currentPosition1 : currentPosition2;
    const set = chance1 ? setCurrentPosition1 : setCurrentPosition2;

    if (key + number > 100) {
    } else if (key + number === 100) {
      chance1 ? Alert.alert('Player 1 Won') : Alert.alert('Player 2 Won');
      set(key + number);
    } else {
      set(key + number);
    }
  }, [chance1]);

  useEffect(() => {
    const key = chance1 ? currentPosition1 : currentPosition2;
    const set = chance1 ? setCurrentPosition1 : setCurrentPosition2;

    switch (key) {
      case 18:
        setTimeout(() => {
          set(key + 18);
        }, 500);
        break;
      case 8:
        setTimeout(() => {
          set(key + 5);
        }, 500);
        break;
      case 32:
        setTimeout(() => {
          set(key + 21);
        }, 500);
        break;
      case 43:
        setTimeout(() => {
          set(key + 55);
        }, 500);
        break;
      case 69:
        setTimeout(() => {
          set(key + 21);
        }, 500);
        break;
      case 99:
        setTimeout(() => {
          set(key - 80);
        }, 500);
        break;
      case 97:
        setTimeout(() => {
          set(key - 22);
        }, 500);
        break;
      case 93:
        setTimeout(() => {
          set(key - 7);
        }, 500);
        break;
      case 66:
        setTimeout(() => {
          set(key - 9);
        }, 500);
        break;
      case 51:
        setTimeout(() => {
          set(key - 16);
        }, 500);
        break;
      case 14:
        setTimeout(() => {
          set(key - 10);
        }, 500);
        break;
    }
  }, [currentPosition1, currentPosition2]);

  let count = 1;
  let lines = 4;

  while (lines >= 0) {
    count = 1;
    for (var i = 20; i > 0; i--) {
      if (count > 10) {
        data.push(2 * lines * 10 + 10 - i + 1);
        count++;
      } else {
        count++;
        data.push(2 * lines * 10 + i);
      }
    }
    lines--;
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'rgb(0,100,51)',
      }}>
      <View style={{flex: 2}}>
        <Menu onPress={onBtnPress} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <View
          style={{
            paddingHorizontal: ResponsiveSize(10),
            paddingVertical: ResponsiveSize(20),
            borderRadius: ResponsiveSize(20),
            borderWidth: 1,
            borderColor: 'white',
            backgroundColor: 'red',
          }}>
          <Text> Player 1 </Text>
        </View>
        <Animated.View
          style={{
            transform: [{translateX: interpolated}],
          }}>
          <Pressable
            onPress={() => {
              shakeFunction();
              setNumber(Math.floor(1 + Math.random() * 6));
              setTimeout(() => {
                setChance1(!chance1);
              }, 200);
            }}>
            <Image
              resizeMode="stretch"
              source={diceArray[number - 1]}
              style={{width: ResponsiveSize(60), height: ResponsiveSize(60)}}
            />
          </Pressable>
        </Animated.View>
        <View
          style={{
            paddingHorizontal: ResponsiveSize(10),
            paddingVertical: ResponsiveSize(20),
            borderRadius: ResponsiveSize(20),
            borderWidth: 1,
            borderColor: 'white',
          }}>
          <Text style={{color: 'white'}}> Player 2 </Text>
        </View>
      </View>
      <View style={{flex: 1}} />
      <View style={{backgroundColor: 'rgb(0,100,51)'}}>
        <FlatList //below board
          bounces={false}
          data={data}
          extraData={data}
          numColumns={10}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  backgroundColor: item % 2 === 0 ? '#FBB52D' : 'white',
                  ...styles.boardCell,
                }}>
                <Text>{item}</Text>
              </View>
            );
          }}
        />

        <View //for ladder and snakes
          style={styles.snakeLadderView}>
          {SLArray.map(elem => (
            <Image resizeMode="stretch" source={elem.img} style={elem.style} />
          ))}
        </View>

        <View //for token View
          style={styles.topBoardView}>
          <FlatList
            bounces={false}
            data={data}
            extraData={data}
            numColumns={10}
            renderItem={({item}) => {
              return (
                <View style={styles.cell}>
                  <View
                    style={{
                      ...styles.token,
                      backgroundColor:
                        item === currentPosition1
                          ? 'red'
                          : item === currentPosition2
                          ? 'green'
                          : 'transparent',
                    }}></View>
                </View>
              );
            }}
          />
        </View>
      </View>
      <View style={{flex: 1}} />
    </SafeAreaView>
  );
};

export default LocalMultiplayer;

const styles = StyleSheet.create({
  boardCell: {
    alignItems: 'center',
    width: '10%',
    height: ResponsiveSize(65),
  },
  snakeLadderView: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 9,
    left: 0,
  },
  ladder1: {
    height: ResponsiveSize(340),
    width: ResponsiveSize(30),
    position: 'absolute',
    top: ResponsiveSize(30),
    left: ResponsiveSize(104),
  },
  ladder2: {
    height: ResponsiveSize(140),
    width: ResponsiveSize(30),
    position: 'absolute',
    top: ResponsiveSize(100),
    left: ResponsiveSize(415),
    transform: [{rotate: '20deg'}],
  },
  ladder3: {
    height: ResponsiveSize(150),
    width: ResponsiveSize(30),
    position: 'absolute',
    top: ResponsiveSize(415),
    left: ResponsiveSize(155),
    transform: [{rotate: '35deg'}],
  },
  ladder4: {
    height: ResponsiveSize(140),
    width: ResponsiveSize(30),
    position: 'absolute',
    top: ResponsiveSize(290),
    left: ResponsiveSize(372),
    transform: [{rotate: '-20deg'}],
  },
  ladder5: {
    height: ResponsiveSize(80),
    width: ResponsiveSize(30),
    position: 'absolute',
    top: ResponsiveSize(540),
    left: ResponsiveSize(345),
  },
  snakes1: {
    height: ResponsiveSize(105),
    width: ResponsiveSize(150),
    position: 'absolute',
    top: ResponsiveSize(540),
    transform: [{rotate: '10deg'}],
    left: ResponsiveSize(170),
  },
  snakes2: {
    height: ResponsiveSize(230),
    width: ResponsiveSize(160),
    position: 'absolute',
    top: ResponsiveSize(257),
    left: ResponsiveSize(280),
    transform: [{rotate: '32deg'}],
  },
  snakes3: {
    height: ResponsiveSize(150),
    width: ResponsiveSize(100),
    position: 'absolute',
    top: ResponsiveSize(25),
    left: ResponsiveSize(175),
    transform: [{rotate: '290deg'}],
  },
  snakes4: {
    height: ResponsiveSize(100),
    width: ResponsiveSize(100),
    position: 'absolute',
    top: ResponsiveSize(225),
    left: ResponsiveSize(165),
    transform: [{rotate: '30deg'}],
  },
  snakes5: {
    height: ResponsiveSize(85),
    width: ResponsiveSize(150),
    position: 'absolute',
    top: ResponsiveSize(25),
    left: ResponsiveSize(215),
  },
  snakes6: {
    height: ResponsiveSize(540),
    width: ResponsiveSize(150),
    position: 'absolute',
    top: ResponsiveSize(30),
    left: ResponsiveSize(-10),
  },
  topBoardView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 9,
    left: 0,
  },
  cell: {
    width: '10%',
    height: ResponsiveSize(65),
    alignItems: 'center',
    justifyContent: 'center',
  },
  token: {
    height: ResponsiveSize(20),
    width: ResponsiveSize(20),
    borderRadius: ResponsiveSize(10),
  },
});

// if dies=6 then player should roll  again 
// player 2 is on no 2 at start instead of 1 
// solve this issue asap 