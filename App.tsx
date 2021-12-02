import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './src/Screens/AuthStack';
import AppStack from './src/Screens/AppStack';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {useSelector} from 'react-redux';
import io from 'socket.io-client/dist/socket.io';

const Stack = createNativeStackNavigator();

export const navigationRef = createNavigationContainerRef();
let socket;

const AppNavigator = () => {
  const userDetails = useSelector(state => state.UserDetailsReducer.loggedIn);

  useEffect(() => {
    const API_LINK = 'https://600a-223-177-181-110.ngrok.io';
    socket = io(API_LINK, {jsonp: false});
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          headerShown: false,
        }}>
        {userDetails ? (
          <Stack.Screen name="AppStack" component={AppStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
export {socket};
