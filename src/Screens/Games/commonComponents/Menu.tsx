import React, {useState} from 'react';
import {View, Text, TouchableOpacity , Image} from 'react-native';
import { menu } from '../../../assets/images';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';

const Menu = ({onPress = () => {}}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <View style={{position: 'absolute', right: 10}}>
        <TouchableOpacity onPress={() => setOpen(!open)}>
          <Image
            source={menu}
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
