import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>NotificationsScreen</Text>
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
export default NotificationsScreen;