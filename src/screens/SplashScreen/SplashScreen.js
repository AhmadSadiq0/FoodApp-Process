import React, {useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { THEME_COLOR } from '../../res/colors';

const SplashScreen = () => {

useEffect(() => {
  const timer = setTimeout(()=>{}, 3000)
  return () => {clearTimeout(timer)}
}, [])

  return (
    <View style={styles.container}>
      <Text>SplashScree</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:THEME_COLOR,
    alignItems:'center',
    justifyContent:'center',
}
})
export default SplashScreen;