import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LoginUserAction} from '../../../store/Actions/UserAction';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '466698973105-64alfjckctooq0bh6ekveue92a0u0vj4.apps.googleusercontent.com',
});

const LoginScreen = () => {
  console.log(useSelector(state => state.UserDetailsReducer));

  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          dispatch(LoginUserAction({userType: 'guest'}));
        }}>
        <Text> Login as a Guest </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          onGoogleButtonPress().then(res => {
            let data = res.user._user;
            console.log(res, 'response from google'),
              dispatch(
                LoginUserAction({userType: 'non-guest', userData: data}),
              );
          });
        }}>
        <Text> Login using Google </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
