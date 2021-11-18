import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {UserAction} from '../../../store/Actions/UserAction';

const LoginScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          dispatch(UserAction({userType: 'guest'}));
        }}>
        <Text>Login as a Guest </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
