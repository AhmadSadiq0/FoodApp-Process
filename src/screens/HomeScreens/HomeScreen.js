import React, { useRef, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Header from "../../components/Header";
import Datalist from "../../components/Datalist";
import AddCard from "../../components/AddCard";
import { WHITE_COLOR, Back_Ground } from "../../res/colors";
import RBSheet from "react-native-raw-bottom-sheet";
import { BURGERIMG } from "../../res/drawables";
import { NotificationsScreen } from "../NotificationsScreens";
const HomeScreen = (props) => {
  const {navigation}=props
  const refRBSheet = useRef();
  const [selectedBurger, setSelectedBurger] = useState(null); 
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
    {
      id: 5,
      name: "Chicken Burger",
      price: 399,
      image: BURGERIMG,
    },
  ];

  const handleAddToCart = (burger) => {
    setSelectedBurger(burger);
    refRBSheet.current.open();
  };

  const renderDatalist = ({ item }) => (
    <Datalist
      title={item.title}
      seeMoreText="See All"
      onSeeMorePress={() => console.log(`${item.title} See All pressed!`)}
      data={burgerData}
      onAddToCart={handleAddToCart}
    />
  );
  const datalistSections = [
    { id: 1, title: "Discounts" },
    { id: 2, title: "Deals" },
    { id: 3, title: "Loyalty Burgers" },
    { id: 4, title: "Burgers" },
  ];
  return (
    <View style={styles.container}>
      <Header  onNotificationPressed={() => {navigation.navigate("Notifications")}} />
      <FlatList
        data={datalistSections}
        renderItem={renderDatalist}
        keyExtractor={(item) => item.id.toString()}
      />
      <RBSheet
        ref={refRBSheet}
        height={300}
        openDuration={250}
        closeOnDragDown={true}
      >
        {selectedBurger && (
          <AddCard
            name={selectedBurger.name}
            description="A delicious choice!"
            image={selectedBurger.image}
            price={selectedBurger.price}
            onAddToCart={() => console.log(`${selectedBurger.name} added to cart!`)}
          />
        )}
      </RBSheet>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom:250,
  },
});
