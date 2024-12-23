import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header1 from '../../components/Header1';
import { DEAL_ICON } from '../../res/drawables';  

const DealsScreen = () => {
  return (
    <View style={styles.container}>
      <Header1 
        title="Featured Deals"
        discountIcon={DEAL_ICON}  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default DealsScreen;
