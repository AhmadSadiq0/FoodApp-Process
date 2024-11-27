import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SignInScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
}
})
export default SignInScreen;