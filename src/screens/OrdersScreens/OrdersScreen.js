import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'

const OrdersScreen = () => {
  return (
    <View style={styles.container}>
      <Text>OrdersScreen</Text>
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
export default OrdersScreen;