import React, { useRef } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";
//Card
import BurgerCard from "./BurgerCard";
//Colors
import { THEME_TEXT_COLOR, THEME_COLOR, Back_Ground, WHITE_COLOR, BLACK_COLOR } from "../res/colors";
import useThemeStore from "../../zustand/ThemeStore";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 150 + 14; 
const SPACING = (width - ITEM_WIDTH) / 2;

const Datalist = (props) => {
  const { title, seeMoreText, onSeeMorePress, data, onAddToCart } = props;
  const scrollX = useRef(new Animated.Value(0)).current;
  const { darkMode } = useThemeStore();

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>{title}</Text>
        <Text style={[styles.seeMore, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]} onPress={onSeeMorePress}>
          {seeMoreText}
        </Text>
      </View>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
          });
          return (
            <Animated.View style={[styles.cardContainer, { transform: [{ scale }] }]}>
              <BurgerCard
                name={item.name}
                price={item.price}
                image={item.image}
                onAdd={() => onAddToCart(item)}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Back_Ground,
    marginBottom: 10,
  },
  containerDark: {
    backgroundColor: BLACK_COLOR,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 27,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  seeMore: {
    fontSize: 14,
    fontWeight: "600",
  },
  cardContainer: {
    width: ITEM_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Datalist;
