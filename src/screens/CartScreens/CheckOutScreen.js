import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'

const CheckOutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CheckOutScreen</Text>
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
export default CheckOutScreen;