import React from 'react'
import { 
    StyleSheet, 
    View 
} from 'react-native'
import Header1 from '../../components/Header1'
import { Confirm_Order } from '../../res/drawables'

const OrderConfirmationScreen = () => {
  return (
    <View style={styles.container}>
      <Header1 
      title='Confirm Order'
      discountIcon={Confirm_Order}
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
export default OrderConfirmationScreen;