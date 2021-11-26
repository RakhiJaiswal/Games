import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {backArrow} from '../../../assets/images';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <View style={{position: 'absolute', left: 10}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          resizeMode={'stretch'}
          source={backArrow}
          style={{height: ResponsiveSize(20), width: ResponsiveSize(30)}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
