import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  EditNameAction,
  LogoutUserAction,
} from '../../../store/Actions/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';
import {close} from '../../../assets/images';
import {TextInput} from 'react-native-gesture-handler';
import {profileIcon} from '../../../assets/images';

const ProfileScreen = ({setIsModalOpen}) => {
  const display_name = useSelector(
    state => state.UserDetailsReducer.userData.displayName,
  );
  const photoURL = useSelector(
    state => state.UserDetailsReducer.userData.photoURL,
  );
  const profile_image = photoURL === undefined ? profileIcon : {uri: photoURL};

  const dispatch = useDispatch();
  const [name, setName] = useState(
    display_name === undefined ? 'GuestUser' : display_name,
  );
  console.log(display_name, 'namename');
  return (
    <View
      style={{
        height: '50%',
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'rgb(254,212,148)',
        borderRadius: ResponsiveSize(50),
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity onPress={() => setIsModalOpen(false)}>
        <Image
          source={close}
          style={{
            height: ResponsiveSize(30),
            width: ResponsiveSize(30),
            alignSelf: 'flex-end',
            marginRight: ResponsiveSize(30),
            marginTop: ResponsiveSize(25),
          }}
        />
      </TouchableOpacity>
      <Text> Name </Text>
      <TextInput
        value={name}
        onChangeText={e => setName(e)}
        style={{borderWidth: 1}}
      />
      <Image source={profile_image} style={{height: 50, width: 50}} />
      <TouchableOpacity onPress={() => dispatch(EditNameAction(name))}>
        <Text> Save </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsModalOpen(false);
          setTimeout(() => {
            dispatch(LogoutUserAction());
          }, 2000);
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: ResponsiveSize(25),
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
