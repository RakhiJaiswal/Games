import React, {useState} from 'react';
import {Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {LoginUserAction} from '../../../store/Actions/UserAction';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '',
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

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          dispatch(LoginUserAction({userType: 'guest'}));
        }}>
        <Text> Login as a Guest </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <Text> Login using Google </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
