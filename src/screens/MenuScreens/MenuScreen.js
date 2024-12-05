import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import Header from '../../components/Header'

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <Header 
      title='Menu'
      Welcomermsg = ''
      containerStyle={{
        height: 188,
    }} 
    textContainer={{
      marginTop:-7
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
export default MenuScreen;