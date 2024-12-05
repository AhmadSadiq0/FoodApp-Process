import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import Header1 from '../../components/Header1'
import { CART_ICON,} from '../../res/drawables'

const CheckOutScreen = () => {
  return (
    <View style={styles.container}>
    <Header1
    title='CheckOut'
    discountIcon={CART_ICON}
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
export default CheckOutScreen;