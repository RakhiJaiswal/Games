import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {LogoutUserAction} from '../../../store/Actions/UserAction';
import {useDispatch} from 'react-redux';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{marginHorizontal: 50, marginTop: 20}}>
      {/* <Text>ProfileScreen </Text>
      <Text> Name </Text>
      <Text> Profile Image</Text> */}
      <TouchableOpacity
        style={{
          margin: 5,
          height: 50,
          alignItems: 'center',
          shadowColor: 'yellow',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 1,
          shadowRadius: 1,
          borderRadius: 40,
          backgroundColor: 'yellow',
          justifyContent: 'center',
        }}
        onPress={() => {
          dispatch(LogoutUserAction());
        }}>
        <Text
          style={{
            marginHorizontal: 15,
            fontSize: 25,
            fontWeight: '900',
            shadowColor: 'green',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 1,
            color: 'red',
            shadowRadius: 1,
            borderRadius: 40,
            fontStyle: 'italic',
          }}>
          Logout{' '}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
