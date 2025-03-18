import { StyleSheet, Text, View } from 'react-native'
import { Header } from '../../components'
import React from 'react'

const DiscountsScreen = () => {
  return (
    <View>
      <Header
        title="Featured Screen"
        Welcomermsg=""
        showSearch={false}
        showShadow={true}
        containerStyle={{
          height: 160,
        }}
        textContainer={{
          marginTop: 0,
        }}
      />
    </View>
  )
}

export default DiscountsScreen

const styles = StyleSheet.create({})