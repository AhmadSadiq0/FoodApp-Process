// /screens/MenuScreen/CategoryItem.js
import React from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { THEME_COLOR, WHITE_COLOR, BLACK_COLOR } from "../res/colors";
import useThemeStore from "../../zustand/ThemeStore";

const CategoryItem = (props) => {
  const { item, onPress, isSelected } = props;
  const { darkMode } = useThemeStore();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: isSelected
            ? THEME_COLOR
            : darkMode
            ? BLACK_COLOR
            : WHITE_COLOR,
        },
      ]}
      activeOpacity={0.8}
    >
      <View style={styles.imageWrapper}>
        
        <Image
          source={item.image && typeof(item.image) == 'string' ? { uri: item.image } : item.image}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text
        style={[
          styles.text,
          {
            color: isSelected ? WHITE_COLOR : THEME_COLOR,
          },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 16,
    padding: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: BLACK_COLOR,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  imageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "#eee",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default CategoryItem;