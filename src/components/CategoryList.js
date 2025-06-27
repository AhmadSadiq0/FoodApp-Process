// /screens/MenuScreen/CategoryList.js
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import useThemeStore from "../../zustand/ThemeStore";
import useCategoryStore from "../store/CategoryStore";
import { CustomLoadingIndicator, CustomErrorText , CategoryItem} from "../components";
import  FOOD_DOME_ICON  from "../res/drawables";

const CategoryList = ({ selectedCategory, onSelectCategory }) => {
  const { darkMode } = useThemeStore();
  const {
    categories = [],
    categoriesLoading,
    categoriesError,
  } = useCategoryStore();

  if (categoriesLoading) return <CustomLoadingIndicator />;
  if (categoriesError) return <CustomErrorText text={categoriesError} darkMode={darkMode} />;

  const allCategory = {
    _id: "all",
    name: "All",
    image: require("../../assets/icons/AllItem1.png")
  };

  const updatedCategories = [allCategory, ...categories];

  return (
    <FlatList
      data={updatedCategories}
      renderItem={({ item }) => (
        <CategoryItem
          item={item}
          isSelected={selectedCategory === item._id}
          onPress={() => onSelectCategory(item._id)}
        />
      )}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      numColumns={3}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex : 1,
    paddingVertical: 16
  },
});

export default CategoryList;