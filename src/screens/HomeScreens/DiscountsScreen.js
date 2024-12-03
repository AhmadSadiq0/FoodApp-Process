import React from 'react'
import { 
    StyleSheet, 
    View 
} from 'react-native'
import Header1 from '../../components/Header1'

const  DiscountsScreen = () => {
  return (
    <View style={styles.container}>
      <Header1/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'center'
}
})
export default DiscountsScreen;