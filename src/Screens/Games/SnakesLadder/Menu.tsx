import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Image,
} from 'react-native';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';
import BackButton from '../commonComponents/BackButton';
import {logo} from './assets/images';

const Menu = ({changeScreen}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <BackButton />
        <View style={{flex: 0.5}} />
        <Image
          resizeMode={'stretch'}
          source={logo}
          style={{height: ResponsiveSize(500), width: '100%'}}
        />
        <View style={{flex: 0.5}} />
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
    color: 'green',
  },
  buttonView: {
    backgroundColor: 'white',
    paddingVertical: ResponsiveSize(10),
    paddingHorizontal: ResponsiveSize(30),
    borderRadius: ResponsiveSize(20),
  },
  img: {width: '70%', height: '18%'},
  mainContainer: {backgroundColor: 'rgb(0,100,51)', flex: 1},
  container: {flex: 1, backgroundColor: 'rgb(0,100,51)', alignItems: 'center'},
});
export default Menu;
