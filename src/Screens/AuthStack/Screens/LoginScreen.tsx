import React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {LoginUserAction} from '../../../store/Actions/UserAction';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';
import {Colors} from '../../Games/TicTacToe/assets/consts';
import {google, user} from '../../../assets/images';

GoogleSignin.configure({
  webClientId:
    '841195506338-ekc93vqpcq2rdeo5vgmue5et401v0qei.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const dispatch = useDispatch();

  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }
  const ButtonView = ({buttonPress, buttonText, icon}) => {
    return (
      <TouchableOpacity style={styles.button} onPress={buttonPress}>
        <Image resizeMode="stretch" style={styles.icon} source={icon} />
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={{flex: 1}} />
      <Text style={styles.appName}> Games </Text>
      <View style={{flex: 1}} />
      <Text style={styles.loginText}>Login as a </Text>
      <View style={{flex: 0.2}} />
      <ButtonView
        buttonText={'  Guest'}
        icon={user}
        buttonPress={() => dispatch(LoginUserAction({userType: 'guest'}))}
      />
      <View style={{flex: 0.1}} />
      <ButtonView
        buttonText={'  Google'}
        icon={google}
        buttonPress={() => {
          onGoogleButtonPress().then(res => {
            console.log(res, 'resres');
            dispatch(
              LoginUserAction({
                userType: 'non-guest',
                userData: res.user._user,
              }),
            );
          });
        }}
      />

      <View style={{flex: 1}} />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.purple,
    alignItems: 'center',
  },
  appName: {
    fontStyle: 'italic',
    color: 'white',
    fontSize: ResponsiveSize(70),
    fontWeight: 'bold',
  },

  loginText: {
    color: 'white',
    fontSize: ResponsiveSize(30),
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: ResponsiveSize(15),
    borderRadius: ResponsiveSize(25),
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {height: ResponsiveSize(25), width: ResponsiveSize(25)},
  buttonText: {fontWeight: 'bold', fontSize: ResponsiveSize(21)},
});
