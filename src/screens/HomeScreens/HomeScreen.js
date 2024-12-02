import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import React from 'react';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header/>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
