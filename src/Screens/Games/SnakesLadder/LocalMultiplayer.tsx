import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  
} from 'react-native';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';

const LocalMultiplayer = ({changeScreen}) => {

  let data = [];
  const [number, setNumber] = useState(0);
  const [currentPosition1, setCurrentPosition1] = useState(1);
  const [currentPosition2, setCurrentPosition2] = useState(1);
  const [chance1, setChance1] = useState(false);
  
  useEffect(() => {
    if (chance1) {
      if (currentPosition1 + number > 100) {
      } else if (currentPosition1 + number === 100) {
        chance1 && Alert.alert('Player 1 Won');
        setCurrentPosition1(currentPosition1 + number);
      } else {
        setCurrentPosition1(currentPosition1 + number);
      }
    } else {
      if (currentPosition2 + number > 100) {
      } else if (currentPosition2 + number === 100) {
        !chance1 && Alert.alert('Player 2 Won');
        setCurrentPosition2(currentPosition2 + number);
      } else {
        setCurrentPosition2(currentPosition2 + number);
      }
    }
  }, [chance1]);

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
    <SafeAreaView>
      <FlatList
        bounces={false}
        data={data}
        extraData={data}
        numColumns={10}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                backgroundColor:
                  item === currentPosition1
                    ? 'red'
                    : item === currentPosition2
                    ? 'green'
                    : '#FFF',
                alignItems: 'center',
                borderWidth: 1,
                width: '9%',
                height: ResponsiveSize(65),
              }}>
              <Text>{item}</Text>
            </View>
          );
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setNumber(Math.floor(1 + Math.random() * 6));
          setChance1(!chance1);
        }}
        style={{
          width: 100,
          height: 40,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Dice</Text>
      </TouchableOpacity>
      <Text>{number}</Text>
    </SafeAreaView>
  );
};

export default LocalMultiplayer;
