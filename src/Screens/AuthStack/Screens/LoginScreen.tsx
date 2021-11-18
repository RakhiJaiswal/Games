import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {LoginUserAction} from '../../../store/Actions/UserAction';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '466698973105-64alfjckctooq0bh6ekveue92a0u0vj4.apps.googleusercontent.com',
});

const LoginScreen = () => {
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
    return subscriber; // unsubscribe on unmount
  }, []);
  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
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
          onGoogleButtonPress().then(res =>
            console.log(res, 'response from google'),
          );
        }}>
        <Text> Login using Google </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
