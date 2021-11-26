import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  EditNameAction,
  EditPicAction,
  LogoutUserAction,
} from '../../../store/Actions/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';
import {close} from '../../../assets/images';
import {TextInput} from 'react-native-gesture-handler';
import {profileIcon} from '../../../assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ImagePicker} from '../Components/ImagePicker';

const ProfileScreen = ({setIsModalOpen}) => {
  const dispatch = useDispatch();
  const {displayName, photoURL} = useSelector(
    state => state.UserDetailsReducer.userData,
  );

  const profile_image = photoURL === undefined ? profileIcon : {uri: photoURL};
  const DisplayName = displayName === undefined ? 'GuestUser' : displayName;

  const [pic, setPic] = useState(profile_image);
  const [name, setName] = useState(DisplayName);

  const logout_func = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      dispatch(LogoutUserAction());
    }, 2000);
  };

  const saveChanges_func = () => {
    dispatch(EditNameAction(name));
    dispatch(EditPicAction(pic.uri));
  };

  const {top} = useSafeAreaInsets();

  const cameraOnPress = () => {
    ImagePicker().then(response => {
      setPic({uri: response});
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={top}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        activeOpacity={1}
        onPress={() => setIsModalOpen(false)}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => setIsModalOpen(false)}
            style={{
              alignSelf: 'flex-end',
            }}>
            <Image source={close} style={styles.close} />
          </TouchableOpacity>
          <View style={{flex: 0.4}} />
          <View style={{flex: 1}}>
            <View style={styles.rowView}>
              <Text> Name </Text>
              <TextInput
                value={name}
                onChangeText={e => setName(e)}
                style={styles.textInput}
              />
            </View>
            <View style={{flex: 1}} />
            <View style={styles.rowView}>
              <Text> Profile {'\n'} Picture </Text>
              <Image source={pic} style={styles.profilePic} />
              <TouchableOpacity
                onPress={() => {
                  cameraOnPress();
                }}
                style={styles.uploadBtn}>
                <Text style={styles.uploadText}> Upload </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}} />
            <TouchableOpacity onPress={saveChanges_func} style={styles.saveBtn}>
              <Text style={styles.saveText}> Save Changes </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}} />
          <TouchableOpacity style={styles.logoutBtn} onPress={logout_func}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          <View style={{flex: 0.1}} />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  logoutText: {
    textAlign: 'center',
    fontSize: ResponsiveSize(25),
  },
  profilePic: {
    height: ResponsiveSize(50),
    width: ResponsiveSize(50),
    marginHorizontal: ResponsiveSize(10),
  },
  container: {
    height: '50%',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'rgb(254,212,148)',
    borderRadius: ResponsiveSize(50),
  },
  close: {
    height: ResponsiveSize(30),
    width: ResponsiveSize(30),
    // alignSelf: 'flex-end',
    marginRight: ResponsiveSize(30),
    marginTop: ResponsiveSize(25),
  },
  logoutBtn: {
    backgroundColor: 'white',
    width: ResponsiveSize(200),
    borderRadius: ResponsiveSize(20),
    alignSelf: 'center',
    paddingVertical: ResponsiveSize(5),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: ResponsiveSize(20),
  },
  textInput: {
    borderWidth: 1,
    padding: ResponsiveSize(5),
    marginLeft: ResponsiveSize(10),
    width: '70%',
  },
  saveBtn: {
    backgroundColor: 'pink',
    width: ResponsiveSize(140),
    alignSelf: 'center',
    paddingVertical: ResponsiveSize(2),
  },
  saveText: {fontSize: ResponsiveSize(15), textAlign: 'center'},
  uploadBtn: {},
  uploadText: {textDecorationLine: 'underline'},
  keyboardAvoidingView: {
    flex: 1,
  },
});
