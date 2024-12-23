import React from 'react'
import { 
    StyleSheet, 
    View 
} from 'react-native'
import ProfileHeader from '../../components/ProfileHeader'
import TextInputProfile from '../../components/TextInputProfile'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ProfileHeader/>
      <TextInputProfile/>
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