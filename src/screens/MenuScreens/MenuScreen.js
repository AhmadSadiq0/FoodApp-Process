import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { WHITE_COLOR, BLACK_COLOR, THEME_COLOR } from "../../res/colors";
import Datalist from "../../components/Datalist";
import Header from "../../components/Header";
import { BURGERIMG, IMAGE16, IMAGE17, IMAGE18 } from "../../res/drawables";
const MenuScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState();
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
            backgroundColor: isSelected ? THEME_COLOR : WHITE_COLOR,
            marginTop: 30,
          },
        ]}
        onPress={() => setSelectedCategory(item.id)}
      >
        <Image
          source={item.image}
          style={[
            styles.image,
            { tintColor: isSelected ? WHITE_COLOR : THEME_COLOR },
          ]}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.categoryText,
            { color: isSelected ? WHITE_COLOR : THEME_COLOR },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={burgerData}
      ListHeaderComponent={
        <>
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
            <Datalist title="Discount" seeMoreText="" data={burgerData} />
          </View>
          <View>
            <Datalist
              title="Discounts"
              seeMoreText=""
              onSeeMorePress={() => console.log("See All pressed!")}
              data={burgerData}
            />
          </View>
        </>
      }
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: WHITE_COLOR,
  },
  header: {
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
