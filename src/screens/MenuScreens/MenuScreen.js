import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet"; // Import RBSheet
import { WHITE_COLOR, BLACK_COLOR, THEME_COLOR, Back_Ground, GRAY_COLOR } from "../../res/colors";
import Datalist from "../../components/Datalist";
import Header from "../../components/Header";
import { BURGERIMG, IMAGE16, IMAGE17, IMAGE18 } from "../../res/drawables";
import AddCard from "../../components/AddCard";

const MenuScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedItem, setSelectedItem] = useState(null); 
  const refRBSheet = useRef(); 
 
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
      name: "Cheese Burger",
      price: 499,
      image: BURGERIMG,
    },
    {
      id: 4,
      name: "Cheese Burger",
      price: 499,
      image: BURGERIMG,
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Burgers",
      image: IMAGE16,
    },
    {
      id: 2,
      name: "Pizzas",
      image: IMAGE18,
    },
    {
      id: 3,
      name: "Kebabs",
      image: IMAGE17,
    },
  ];

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    refRBSheet.current.open(); 
  };

  const renderCategory = ({ item }) => {
    const isSelected = selectedCategory === item.id;
    return (
      <TouchableOpacity
        style={[styles.categoryCard, {
          backgroundColor: isSelected ? THEME_COLOR : WHITE_COLOR,
          marginTop: 30,
        }]}
        onPress={() => setSelectedCategory(item.id)}
      >
        <Image
          source={item.image}
          style={[styles.image, { tintColor: isSelected ? WHITE_COLOR : THEME_COLOR }]}
          resizeMode="contain"
        />
        <Text style={[styles.categoryText, { color: isSelected ? WHITE_COLOR : THEME_COLOR }]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header />
      <FlatList
        data={burgerData}
        ListHeaderComponent={
          <View style={styles.header}>
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.scrollContainer}
              numColumns={3}
              showsVerticalScrollIndicator={false}
            />
            <View>
              <Datalist title="Discount" seeMoreText="" data={burgerData} onAddToCart={handleAddToCart} />
            </View>
            <View>
              <Datalist
                title="Discounts"
                seeMoreText=""
                onSeeMorePress={() => console.log("See All pressed!")}
                data={burgerData}
              />
            </View>
          </View>
        }
        keyExtractor={(item) => item.id.toString()}
      />
      {/* Updated RBSheet Component */}
      <RBSheet
        ref={refRBSheet}
        height={430}
        draggable={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: "center",
            backgroundColor: WHITE_COLOR,
          },
          wrapper: { backgroundColor: "transparent" },
          draggableIcon: { backgroundColor: GRAY_COLOR },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        {selectedItem && (
          <AddCard
            name={selectedItem.name}
            description="A delicious choice!" // Description can be customized
            image={selectedItem.image}
            price={selectedItem.price}
            onAddToCart={() => console.log("Added to Cart")}
          />
        )}
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Back_Ground,
  },
  header: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: Back_Ground,
  },
  scrollContainer: {
    paddingVertical: 16,
    justifyContent: "center",
    alignSelf: "center",
  },
  categoryCard: {
    width: 100,
    height: 100,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    shadowColor: BLACK_COLOR,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: 51,
    height: 50,
    marginBottom: 8,
  },
  categoryText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MenuScreen;
