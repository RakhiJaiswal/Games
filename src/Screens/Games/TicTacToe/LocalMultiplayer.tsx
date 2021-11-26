import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';
import {Cross, Circle, Tic, Toe, Tac, Reload} from './assets/images/index';
import {Colors} from './assets/consts';
import Menu from '../commonComponents/Menu';

let Xarray: number[] = [];
let Oarray: number[] = [];
let mockData: number[] | string[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let disable = [false, false, false, false, false, false, false, false, false];
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
let winArray: number[] = [];

const LocalMultiplayer = ({changeScreen}) => {
  const [count, setCount] = useState(0);
  const [turn, setNextTurn] = useState('X');
  const [cell1, setCell1] = useState<number>();
  const [cell2, setCell2] = useState<number>();
  const [cell3, setCell3] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [winner, setWinner] = useState('');
  let hasWinner: string | boolean;

  useEffect(() => {
    if (count === 0) {
      setWinner(false);
    }

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
        setWinner(turn === 'X' ? 'O' : 'X');
        disable.fill(true, 0, disable.length);
        setIsModalOpen(true);
        break;
      }
    }
  }, [turn]);

  useEffect(() => {
    if (count === 9 && hasWinner !== true) {
      setWinner('Tie');
      disable.fill(true, 0, disable.length);
      setIsModalOpen(true);
    }
  }, [count]);

  useEffect(() => {
    setCell1(winArray[0]);
    setCell2(winArray[1]);
    setCell3(winArray[2]);
  }, [winArray]);

  const reset = () => {
    Xarray = [];
    Oarray = [];
    mockData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    disable = [false, false, false, false, false, false, false, false, false];
    winArray = [];
    setCount(0);
    setNextTurn('X');
    setCell1(-1);
    setCell2(-1);
    setCell3(-1);
    hasWinner = '';
  };

  const DefaultModalContent = () => {
    return (
      <View style={styles.content}>
        <Text style={styles.contentTitle}>
          {winner === 'Tie'
            ? 'Tie Game'
            : winner === 'X'
            ? 'Player 1 Wins'
            : 'Player 2 Wins'}
        </Text>
        <LottieView
          source={require('../../../../piggyDancing.json')}
          autoPlay
          loop
        />
        <LottieView source={require('../../../../winner.json')} autoPlay loop />
        <TouchableOpacity
          onPress={() => {
            setIsModalOpen(false);
            reset();
          }}
          style={{
            position: 'absolute',
            bottom: ResponsiveSize(-25),
            backgroundColor: 'orange',
            width: ResponsiveSize(70),
            height: ResponsiveSize(70),
            borderRadius: ResponsiveSize(50),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={Reload}
            style={{width: ResponsiveSize(50), height: ResponsiveSize(50)}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <View style={styles.gameName}>
        <Menu
          onPress={() => {
            reset();
            changeScreen();
          }}
        />
        <Animatable.Text
          animation="bounceIn"
          iterationCount={'infinite'}
          direction="alternate">
          <Image
            resizeMode={'contain'}
            source={Tic}
            style={{width: ResponsiveSize(100), height: ResponsiveSize(50)}}
          />
        </Animatable.Text>

        <Animatable.Text
          animation="bounceIn"
          iterationCount={'infinite'}
          direction="alternate">
          <Image
            resizeMode={'contain'}
            source={Tac}
            style={{width: ResponsiveSize(100), height: ResponsiveSize(50)}}
          />
        </Animatable.Text>

        <Animatable.Text
          animation="bounceIn"
          iterationCount={'infinite'}
          direction="alternate">
          <Image
            resizeMode={'contain'}
            source={Toe}
            style={{width: ResponsiveSize(100), height: ResponsiveSize(50)}}
          />
        </Animatable.Text>
      </View>

      <View style={styles.playersView}>
        <View
          style={{
            ...styles.tokenView,
            borderColor: turn === 'X' ? 'yellow' : Colors.blue,
            backgroundColor: turn === 'X' ? 'yellow' : Colors.darkPurple,
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
            backgroundColor: turn === 'O' ? 'yellow' : Colors.darkPurple,
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
                    setCount(count + 1);
                    setNextTurn(turn === 'X' ? 'O' : 'X');
                  }}
                  activeOpacity={1}
                  style={{
                    ...styles.cell,
                    backgroundColor:
                      cell1 === index || cell2 === index || cell3 === index
                        ? 'yellow'
                        : Colors.darkPurple,
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
        <View>
          <Modal
            isVisible={isModalOpen}
            backdropColor="#B4B3DB"
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}>
            <DefaultModalContent />
          </Modal>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gameName: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: ResponsiveSize(10),
  },
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
  },
  img: {height: ResponsiveSize(90), width: ResponsiveSize(90)},
  content: {
    backgroundColor: Colors.purple,
    height: '70%',
    alignItems: 'center',
    borderRadius: ResponsiveSize(50),
  },
  contentTitle: {
    fontSize: ResponsiveSize(50),
    color: Colors.pink,
    fontWeight: 'bold',
    marginTop: ResponsiveSize(30),
  },
});
export default LocalMultiplayer;
