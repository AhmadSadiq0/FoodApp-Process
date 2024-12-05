import React, { useRef } from "react";
import { View, Text, Animated, StyleSheet, Dimensions, } from "react-native";
import BurgerCard from "./BurgerCard";
import { THEME_TEXT_COLOR,THEME_COLOR } from "../res/colors";
const { width } = Dimensions.get("window");
const ITEM_WIDTH = 150 + 14; 
const SPACING = (width - ITEM_WIDTH) / 2;
const Datalist = ({ title, seeMoreText, onSeeMorePress, data }) => {  
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.seeMore} onPress={onSeeMorePress}>
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
                onAdd={() => console.log(`${item.name} added to cart!`)}
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
    marginVertical: 8,
    // backgroundColor: "#f8f8f8",
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
    color: THEME_TEXT_COLOR,
  },
  seeMore: {
    fontSize: 14,
    fontWeight: "600",
    color: THEME_COLOR,
  },
  cardContainer: {
    width: ITEM_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Datalist;