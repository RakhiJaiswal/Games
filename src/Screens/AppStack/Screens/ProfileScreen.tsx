import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {LogoutUserAction} from '../../../store/Actions/UserAction';
import {useDispatch} from 'react-redux';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <Text>ProfileScreen </Text>
      <Text> Name </Text>
      <Text> Profile Image</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(LogoutUserAction());
        }}>
        <Text> Logout </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
