import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet,
} from 'react-native';
import {Colors} from './consts';
import {Tic, Toe, Tac} from './assets/index';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';

const TicTacToe = ({navigation}) => {
  const imgArr = [Tic, Tac, Toe];
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        {imgArr.map(elem => (
          <Image resizeMode={'stretch'} source={elem} style={styles.img} />
        ))}
        <View style={{flex: 1}} />
        <TouchableOpacity
          style={styles.buttonView}
          onPress={() => {
            navigation.navigate('LocalMultiplayer');
          }}>
          <Text style={styles.buttonText}> Local Mutliplayer </Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
      </View>
    </SafeAreaView>
  );
};

export default TicTacToe;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: ResponsiveSize(30),
    fontWeight: 'bold',
    color: 'magenta',
  },
  buttonView: {
    backgroundColor: 'white',
    paddingVertical: ResponsiveSize(10),
    paddingHorizontal: ResponsiveSize(30),
    borderRadius: ResponsiveSize(20),
  },
  img: {width: '50%', height: '18%'},
  mainContainer: {backgroundColor: Colors.purple, flex: 1},
  container: {flex: 1, backgroundColor: Colors.purple, alignItems: 'center'},
});
