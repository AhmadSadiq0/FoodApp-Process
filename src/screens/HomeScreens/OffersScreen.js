import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header1 from '../../components/Header1';
import { OFFER_ICON} from '../../res/drawables';  

const DealsScreen = () => {
  return (
    <View style={styles.container}>
      <Header1 
        title="Featured Offers"
        discountIcon={OFFER_ICON}  
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
