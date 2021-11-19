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
import BackButton from '../commonComponents/BackButton';

const Menu = ({changeScreen}) => {
  const imgArr = [Tic, Tac, Toe];
  return (
    <View style={styles.container}>
      <BackButton />
      <View style={{height: ResponsiveSize(40)}} />
      {imgArr.map(elem => (
        <Image resizeMode={'stretch'} source={elem} style={styles.img} />
      ))}

      <View style={{flex: 1}} />
      <TouchableOpacity style={styles.buttonView} onPress={changeScreen}>
        <Text style={styles.buttonText}> Local Mutliplayer </Text>
      </TouchableOpacity>
      <View style={{flex: 1}} />
    </View>
  );
};

export default Menu;

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
  img: {width: '70%', height: '18%'},
  mainContainer: {backgroundColor: Colors.purple, flex: 1},
  container: {flex: 1, backgroundColor: Colors.purple, alignItems: 'center'},
});
