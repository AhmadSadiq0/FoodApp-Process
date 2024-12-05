import React from 'react'
import { 
    StyleSheet, 
    View 
} from 'react-native'
import ProfileHeader from '../../components/ProfileHeader'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ProfileHeader/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center'
    }
})
export default ProfileScreen;