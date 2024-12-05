import React from 'react'
import { 
    StyleSheet, 
    View 
} from 'react-native'
import Header from '../../components/Header'

const CartScreen = () => {
  return (
    <View style={styles.container}>
    <Header 
    title='Cart'
    Welcomermsg = ''
    showSearch={false}
    showShadow={true}
    containerStyle={{
      height: 160,
  }} 
  textContainer={{
    marginTop:0
  }}
  />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center'
    }
})
export default CartScreen;