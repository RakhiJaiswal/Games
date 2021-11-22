import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Image} from 'react-native-animatable';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <View style={{position: 'absolute', left: 10}}>
      <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')}>
        <Image
          resizeMode={'stretch'}
          source={require('../../../assets/images/backArrow.png')}
          style={{height: ResponsiveSize(20), width: ResponsiveSize(30)}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
