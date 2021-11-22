import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';
import BackButton from '../commonComponents/BackButton';

const Bingo = () => {
  const bingoArray = [];

  do {
    var r = Math.floor(Math.random() * 25) + 1;
    if (bingoArray.indexOf(r) === -1) bingoArray.push(r);
  } while (bingoArray.length < 25);

  const data = [];

  bingoArray.map(item => {
    data.push({
      value: item,
      selected: false,
    });
  });
  const [bingoData, setBingoData] = useState(data);
  const [UserArray, setUserArray] = useState([]);
  const [result, setResult] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const winningCombos = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];
  const [Counter, setCounter] = useState(0);
  useEffect(() => {
    checkWinner();
  }, [bingoData]);

  const checkWinner = () => {
    for (var i = 0; i < 12; i++) {
      const res = winningCombos[i].every(elem => UserArray.includes(elem));
      const res2 = result;
      res2[i] = res;
      setResult([...res2]);
      result[i] = res;
    }
  };

  const renderBingo = ({item, index}) => {
    return (
      <TouchableOpacity
        disabled={item.selected}
        onPress={() => {
          setUserArray([...UserArray, index]);
          const temp = bingoData;
          temp[index].selected = true;
          setBingoData([...temp]);
        }}
        style={{
          backgroundColor: item.selected ? 'orange' : 'rgb(255,223,56)',
          width: ResponsiveSize(80),
          height: ResponsiveSize(80),
          padding: ResponsiveSize(10),
          margin: ResponsiveSize(5),
          borderRadius: ResponsiveSize(7),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: ResponsiveSize(40), fontWeight: 'bold'}}>
          {item.value}
        </Text>
      </TouchableOpacity>
    );
  };
  let count;
  useEffect(() => {
    setCounter(0);
    count = 0;
    count = result.filter(Boolean).length;
    if (count >= 5) {
      Alert.alert('you Won');
    }
    setCounter(count);
  }, [result]);

  return (
    <SafeAreaView style={{backgroundColor: 'rgb(0,202,192)', flex: 1}}>
      <StatusBar barStyle={'light-content'} />

      <View
        style={{
          backgroundColor: 'rgb(0,202,192)',
          flex: 1,
          alignItems: 'center',
        }}>
        <BackButton />
        <View style={{flex: 1}} />
        <Text>
          <Text
            style={{
              fontSize: 35,
              marginLeft: 20,
              textDecorationLine: Counter > 0 ? 'line-through' : 'none',
            }}>
            B
          </Text>
          <Text
            style={{
              fontSize: 35,
              marginLeft: 10,
              textDecorationLine: Counter > 1 ? 'line-through' : 'none',
            }}>
            I
          </Text>
          <Text
            style={{
              fontSize: 35,
              marginLeft: 10,
              textDecorationLine: Counter > 2 ? 'line-through' : 'none',
            }}>
            N
          </Text>
          <Text
            style={{
              fontSize: 35,
              marginLeft: 10,
              textDecorationLine: Counter > 3 ? 'line-through' : 'none',
            }}>
            G
          </Text>
          <Text
            style={{
              fontSize: 35,
              marginLeft: 10,
              textDecorationLine: Counter > 4 ? 'line-through' : 'none',
            }}>
            O
          </Text>
        </Text>
        <View style={{flex: 0.2}} />
        <FlatList
          data={bingoData}
          numColumns={5}
          bounces={false}
          renderItem={renderBingo}
          contentContainerStyle={{alignSelf: 'center'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Bingo;
