import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Image} from 'react-native-animatable';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';

const Menu = ({onPress = () => {}}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <View style={{position: 'absolute', right: 10}}>
        <TouchableOpacity onPress={() => setOpen(!open)}>
          <Image
            source={require('../../../assets/menu.png')}
            resizeMode={'stretch'}
            style={{height: ResponsiveSize(20), width: ResponsiveSize(20)}}
          />
        </TouchableOpacity>
      </View>
      {open && (
        <View
          style={{
            position: 'absolute',
            right: ResponsiveSize(10),
            top: ResponsiveSize(40),
            backgroundColor: 'white',
            padding: ResponsiveSize(10),
            zIndex: 999,
          }}>
          <TouchableOpacity
            onPress={() => {
              onPress();
            }}>
            <Text> Leave Game </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Menu;
