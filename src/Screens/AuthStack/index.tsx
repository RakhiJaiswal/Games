import React from 'react';
import LoginScreen from './Screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        animation: 'slide_from_right',
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
