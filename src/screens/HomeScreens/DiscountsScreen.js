import React from 'react';
import { View, StyleSheet } from 'react-native';
import Datalist from '../../components/Datalist';
import { BURGERIMG } from '../../res/drawables';
const DiscountsScreen = () => {
  const burgerData = [
    {
      id: 1,
      name: 'Double Cheese Burger',
      price: 599, 
      image: BURGERIMG,
    },
    {
      id: 2,
      name: 'Cheese Burger',
      price: 499,
      image: BURGERIMG, 
    },
    {
      id: 3,
      name: 'Chicken Burger',
      price: 399,
      image: BURGERIMG, 
    },
  ];
  return (
    <View style={styles.container}>
      <Datalist
        title="Discounts"
        seeMoreText="See All"
        onSeeMorePress={() => console.log('See All pressed!')}
        data={burgerData}
      />
        <Datalist
        title="Deals"
        seeMoreText="See All"
        onSeeMorePress={() => console.log('See All pressed!')}
        data={burgerData}
      />
        <Datalist
        title="LoyaltyBurgers"
        seeMoreText="See All" 
        onSeeMorePress={() => console.log('See All pressed!')}
        data={burgerData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default DiscountsScreen;
