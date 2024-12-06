import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Datalist from "../../components/Datalist";
import Header from "../../components/Header";
import { BURGERIMG, IMAGE16, IMAGE17, IMAGE18 } from "../../res/drawables";
const MenuScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
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

  const renderCategory = ({ item }) => {
    const isSelected = selectedCategory === item.id;
    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          {
            backgroundColor: isSelected ? "#EF4444" : "#FFFFFF",
          },
        ]}
        onPress={() => setSelectedCategory(item.id)}
      >
        <Image source={item.image} style={styles.image} resizeMode="contain"/>
        <Text
          style={[
            styles.categoryText,
            { color: isSelected ? "#FFFFFF" : "#EF4444" },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Header
          title="Menu"
          Welcomermsg=""
          containerStyle={{
            height: 188,
          }}
          textContainer={{
            marginTop: -7,
          }}
        />
      </View>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollContainer}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
      <View>
        <Datalist
          title="Discounts"
          seeMoreText="See All"
          onSeeMorePress={() => console.log("See All pressed!")}
          data={burgerData}
        />
      </View>
      <View>
        <Datalist
          title="Discounts"
          seeMoreText="See All"
          onSeeMorePress={() => console.log("See All pressed!")}
          data={burgerData}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 16,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  categoryText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default MenuScreen;
