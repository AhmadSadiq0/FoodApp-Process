import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Header from "../../components/Header";
import Datalist from "../../components/Datalist";
import AddCard from "../../components/AddCard";
import RBSheet from "react-native-raw-bottom-sheet";
import { THEME_COLOR, THEME_TEXT_COLOR } from "../../res/colors";
import { BURGERIMG } from "../../res/drawables";

const HomeScreen = ({ navigation }) => {
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
  ];
  return (
    <View style={styles.container}>
      <Header />
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
        // customStyles={{
        //   container: { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
        // }}
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
    backgroundColor: "white",
    marginBottom:10,
  },
});