import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import Header1 from '../../components/Header1'

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Header1
      discountIcon = "none"
      title='Notifications'
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
export default NotificationsScreen;