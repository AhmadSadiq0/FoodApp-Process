import React from 'react'
import { View, StyleSheet,ScrollView } from "react-native";
import Header1 from '../../components/Header1'
import Datalist from "../../components/Datalist";
import { BURGERIMG } from "../../res/drawables";
import AddCard from "../../components/AddCard";

const DiscountsScreen = () => {
  const burgerData = [
    {
      id: 1,
      name: "Double Cheese Burger",
      price: 599,
      image: BURGERIMG,
    },
    {
      id: 2,
      name: "Cheese Burger",
      price: 499,
      image: BURGERIMG,
    },
    {
      id: 3,
      name: "Chicken Burger",
      price: 399,
      image: BURGERIMG,
    },
    {
      id: 4,
      name: "Chicken Burger",
      price: 399,
      image: BURGERIMG,
    },
  ];
  const addCardData = {
    name: "2 Double Cheese Burger",
    description: "Double Delight",
    image: BURGERIMG,
    price: 849,
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
     <Header1/>
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
        seeMoreText="See All"
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
    backgroundColor: "#fff",
    padding: 7,
  },
});
export default DiscountsScreen;
