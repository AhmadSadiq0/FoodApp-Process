import React, {useEffect} from 'react';
import { 
  StyleSheet, 
  Image, 
  View 
} from 'react-native';
import { THEME_COLOR, WHITE_COLOR } from '../../res/colors';
import { PIZZA_ICON } from '../../res/drawables';

const SplashScreen = () => {

useEffect(() => {
  const timer = setTimeout(()=>{}, 3000)
  return () => {clearTimeout(timer)}
}, [])

  return (
    <View style={styles.container}>
      <Image source={PIZZA_ICON} style={styles.image}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:THEME_COLOR,
    alignItems:'center',
    justifyContent:'center',
},
image : {
  width : 80,
  height : 80,
  resizeMode : 'contain',
  tintColor : WHITE_COLOR
}
})
export default SplashScreen;