import {Dimensions} from 'react-native';

export const ResponsiveSize = size => {
  const responsiveValue = Dimensions.get('window').width / 480;
  return size * responsiveValue;
};
