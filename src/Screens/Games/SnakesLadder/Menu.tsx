import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {Colors} from '../TicTacToe/consts';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';
import BackButton from '../commonComponents/BackButton';
const Menu = ({changeScreen}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <BackButton />
        <View style={{height: ResponsiveSize(40)}} />
        <Text> snakes and LAdder </Text>
        <View style={{flex: 1}} />
        <TouchableOpacity style={styles.buttonView} onPress={changeScreen}>
          <Text style={styles.buttonText}> Local Mutliplayer </Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
      </View>
    </SafeAreaView>
  );
};

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
export default Menu;
