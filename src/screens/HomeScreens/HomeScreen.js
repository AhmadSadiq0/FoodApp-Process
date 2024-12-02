
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton'
const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.screenContainer}>
      <CustomButton 
        title="Sign Up" 
        backgroundColor="#F63440" 
        onPress={() => navigation.navigate('HomeScreen')}
        style={{ elevation: 5, shadowColor: '#000' }} 
      />
    </View>
  )
}
export default HomeScreen
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      },
})
