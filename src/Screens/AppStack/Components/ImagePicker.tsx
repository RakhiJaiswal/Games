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

export const ImagePicker = () => {
  let abc;
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
      abc = image;
    }
  });
  return abc;
};
