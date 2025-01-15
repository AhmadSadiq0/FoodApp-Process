import React from 'react'
import { View, StyleSheet,ScrollView } from "react-native";
//Images
import { BURGERIMG } from "../../res/drawables";
//component
import {AddCard,Datalist} from "../../components/AddCard";
//colors
import { WHITE_COLOR } from '../../res/colors';
const DiscountsScreen = () => {
  const burgerData = [
    {
      id: 1,
      name: "Double Cheese Burger",
      price: 59,
      image: BURGERIMG,
    },
    {
      id: 2,
      name: "Cheese Burger",
      price: 49,
      image: BURGERIMG,
    },
    {
      id: 3,
      name: "Chicken Burger",
      price: 39,
      image: BURGERIMG,
    },
    {
      id: 4,
      name: "Chicken Burger",
      price: 39,
      image: BURGERIMG,
    },
  ];
  const addCardData = {
    name: "2 Double Cheese Burger",
    description: "Double Delight",
    image: BURGERIMG,
    price: 84,
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Datalist
        title="Discounts"
        seeMoreText="See All"
        onSeeMorePress={() => console.log("See All pressed!")}
        data={burgerData} 
      />
      <Datalist
        title="Deals"
        seeMoreText="See All" 
        onSeeMorePress={() => console.log("See All pressed!")}
        data={burgerData}
      />
      <Datalist
        title="LoyaltyBurgers"
        seeMoreText="See"
        onSeeMorePress={() => console.log("See All pressed!")}
        data={burgerData}
       
      />
<View style={styles.addCardContainer}>
        <AddCard
          name={addCardData.name}
          description={addCardData.description}
          image={addCardData.image}
          price={addCardData.price}
          onAddToCart={() => console.log(`${addCardData.name} added to cart`)}
        />
      </View>

    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE_COLOR,
    padding : 7
  },
});
export default DiscountsScreen;
