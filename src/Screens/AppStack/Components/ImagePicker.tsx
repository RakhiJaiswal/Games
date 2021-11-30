import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const imagePickerOptions = {
  title: '',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  quality: 0.1,
  mediaType: 'photo',
};

const ImagePicker = ({setPic}) => {
  const cameraOnPress = () => {
    launchImageLibrary(imagePickerOptions, response => {
      if (!response.assets) {
        response.didCancel
          ? console.log('User cancelled image picker')
          : console.log(
              'ImagePicker Error: ',
              response.errorCode,
              response.errorMessage,
            );
      } else {
        const image = response.assets[0].uri;
        setPic({uri: image});
      }
    });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        cameraOnPress();
      }}>
      <Text style={styles.uploadText}> Upload </Text>
    </TouchableOpacity>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  uploadText: {textDecorationLine: 'underline'},
});
