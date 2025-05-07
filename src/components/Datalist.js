import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import BurgerCard from "./BurgerCard";
import BurgerCardHorizantol from "./BurgerCardHorizantol"; // Importing your horizontal card component
import { THEME_COLOR, Back_Ground, WHITE_COLOR, BLACK_COLOR } from "../res/colors";
import useThemeStore from "../../zustand/ThemeStore";

const ITEM_WIDTH = 150 + 14;

const Datalist = (props) => {
  const { title, seeMoreText, onSeeMorePress, data, onAddToCart, navigation , isLastArray } = props;
  const { darkMode } = useThemeStore();

  const renderItem = ({ item }) => {
    if (isLastArray) {
      return (
        <View style={styles.lastcardContainer}>
          <BurgerCardHorizantol
            name={item.name}
            price={item?.variants[0]?.price}
            image={item.image}
            description={item.description}
            onAdd={() => onAddToCart(item)}
            navigation={navigation}
            item={item}
            style={styles.card}  
          />
        </View>
      );
    }

    return (
      <View style={styles.cardContainer}>
        <BurgerCard
          name={item.name}
          price={item?.variants[0]?.price}
          image={item.image}
          description={item.description}
          onAdd={() => onAddToCart(item)}
          navigation={navigation}
          item={item}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>{title}</Text>
        <TouchableOpacity
          style={[styles.seeMore]}
          onPress={onSeeMorePress}
          hitSlop={20}
        >
          <Text style = {{ color: darkMode ? WHITE_COLOR : THEME_COLOR }}>
            {seeMoreText}
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={data}
        keyExtractor={(item, index) => (item._id ? item._id.toString() : index.toString())}
        horizontal = {!isLastArray}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Back_Ground,
    paddingBottom: 10,
  },
  containerDark: {
    backgroundColor: BLACK_COLOR,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 17,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    // fontStyle : "italic"
  },
  seeMore: {
    fontSize: 14,
    fontWeight: "600",
  },
  list: {
    
  },
  cardContainer: {
    width: ITEM_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal : 18,
    marginBottom : 10
  },
  lastcardContainer : {
    
  }
});

export default Datalist;
