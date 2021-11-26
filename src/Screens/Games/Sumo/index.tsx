import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import {ResponsiveSize} from '../../../utils/ResponsiveSize';
import Menu from '../commonComponents/Menu';

const Sumo = ({navigation}) => {
  const [y, setY] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (y < -169 || y > 170) {
      setDisabled(true);
    }
  }, [y]);
  useEffect(() => {
    disabled && (y > 170 ? Alert.alert('Blue wins') : Alert.alert('red wins'));
  }, [disabled]);

  const onBtnPress = () => {
    setDisabled(false);
    setY(0);
    navigation.goBack();
  };
  console.log(y, 'y');
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'pink', alignItems: 'center'}}>
      <View style={{alignSelf: 'flex-end'}}>
        <Menu onPress={onBtnPress} />
      </View>
      <View style={{flex: 1}} />
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          setY(y + 10);
        }}>
        <View
          style={{
            height: ResponsiveSize(100),
            width: ResponsiveSize(100),
            backgroundColor: 'blue',
            borderRadius: ResponsiveSize(50),
            borderWidth: 3,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          marginVertical: ResponsiveSize(30),
          alignItems: 'center',
          justifyContent: 'center',
          height: ResponsiveSize(400),
          width: ResponsiveSize(400),
          borderRadius: ResponsiveSize(280),
          backgroundColor: 'yellow',
          borderWidth: ResponsiveSize(20),
        }}>
        <View
          onLayout={event => setY(Math.round(event.nativeEvent.layout.y) - 150)}
          style={{
            height: ResponsiveSize(40),
            width: ResponsiveSize(40),
            backgroundColor: 'purple',
            transform: [{translateY: y}],
          }}></View>
      </View>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          setY(y - 10);
        }}>
        <View
          style={{
            height: ResponsiveSize(100),
            width: ResponsiveSize(100),

            borderRadius: ResponsiveSize(50),
            borderWidth: 3,
            backgroundColor: 'red',
          }}
        />
      </TouchableOpacity>
      <View style={{flex: 1}} />
    </SafeAreaView>
  );
};

export default Sumo;
