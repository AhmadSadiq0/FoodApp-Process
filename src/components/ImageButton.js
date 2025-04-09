import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { INPUT_BACK_COLOR, LIGHT_THEME_BACKGROUND, LIGHT_THEME_COLOR, THEME_COLOR } from '../res/colors';


const ImageButton = (props ) => {
    const { imageSource, onPress, imageStyle = {}, buttonStyle = {} } = props
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Image source={imageSource} style={[styles.image, imageStyle]} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : LIGHT_THEME_COLOR,
  },
  image: {
    width: 20,
    height: 20,
    tintColor : THEME_COLOR
  },
});

export default ImageButton;
