import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image, BackHandler } from "react-native";
import { useRoute } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
// Components
import BurgerCardHorizantol from "../../components/BurgerCardHorizantol";
// Stores
import useItemStore from "../../store/ItemStore";
import useThemeStore from "../../../zustand/ThemeStore";
// Images
import { ARROW_ICON, BACK_ICON } from "../../res/drawables";
// Colors
import { THEME_COLOR, Back_Ground, WHITE_COLOR, BLACK_COLOR } from "../../res/colors";
import ImageButton from "../../components/ImageButton";
const SeeAllScreen = ({ navigation }) => {
  const route = useRoute();
  const { categoryId, title, isHome = true } = route.params;
  const { categorized_items, homeSectionItems } = useItemStore();
  const [filteredItems, setFilteredItems] = useState([]);
  const { darkMode } = useThemeStore();

  useEffect(() => {
    const category = isHome ? homeSectionItems.find(item => item.categoryId == categoryId) : categorized_items.find(item => item.categoryId == categoryId);
    setFilteredItems(category?.items || []);
    console.log(category?.items)
  }, [categorized_items, categoryId]);

  const handleAddToCart = (burger) => {
    navigation.navigate('itemDetail', { item: burger });
  };

  const renderItem = ({ item }) => (
    <BurgerCardHorizantol
      name={item.name}
      price={item?.variants[0]?.price}
      image={item.image}
      description={item.description}
      onAdd={() => handleAddToCart(item)}
      navigation={navigation}
      item={item}
      style={styles.card}
    />
  );

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <View style={styles.headerRow}>
        <ImageButton imageSource={BACK_ICON} onPress={() => navigation.goBack()} /> 
        <Text style={[styles.title, darkMode && styles.titleDark]}>{title}</Text>
      </View>

      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          renderItem={renderItem}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ActivityIndicator size="large" color={THEME_COLOR} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Back_Ground,
   paddingTop: 10,
    paddingHorizontal: 10,
  },
  containerDark: {
    backgroundColor: BLACK_COLOR,
  },
  headerRow: {
   // paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20
  },
  arrowIcon: {
    width: 40,
    height: 40,
    tintColor: THEME_COLOR,
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: THEME_COLOR,
    bottom: 2
  },
  titleDark: {
    color: WHITE_COLOR,
  },
});

export default SeeAllScreen;