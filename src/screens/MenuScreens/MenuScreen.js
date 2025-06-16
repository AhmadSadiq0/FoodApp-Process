// /screens/MenuScreen/MenuScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text
} from "react-native";
import {
  WHITE_COLOR,
  THEME_COLOR,
  Back_Ground,
  BLACK_COLOR,
} from "../../res/colors";


import useThemeStore from "../../../zustand/ThemeStore";
import useSearchStore from "../../store/SearchStore";
import useItemStore from "../../store/ItemStore";
import useCategoryStore from "../../store/CategoryStore";
import useBranchStore from "../../store/BranchStore";

import { CustomErrorText, CustomLoadingIndicator, Datalist, CategoryList } from "../../components";

const MenuScreen = ({ navigation }) => {
  const { darkMode } = useThemeStore();
  const { searchQuery } = useSearchStore();
  const {
    categorized_items = [],
    categorized_loading,
    categorized_error,
    fetchItemsByBranch,
  } = useItemStore();
  const { fetchCategories } = useCategoryStore();
  const { selectedBranch } = useBranchStore();

  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchItemsByBranch(selectedBranch._id);
    fetchCategories(selectedBranch._id);
  }, [selectedBranch]);

  const filteredData =
    selectedCategory === "all"
      ? categorized_items
      : categorized_items
        .filter((cat) => cat.categoryId === selectedCategory)
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((cat) => cat.items.length > 0);

  const handleAddToCart = (item) => {
    navigation.navigate("itemDetail", { item });
  };

  const renderDatalist = ({ item }) => (
    <Datalist
      title={item.categoryName}
      seeMoreText=""
      data={item.items}
      navigation={navigation}
      onAddToCart={handleAddToCart}
    />
  );

  const renderEmptyComponent = () =>
    categorized_loading ? (
      <View style={{ alignItems: 'center', height: 300 }}>
        <CustomLoadingIndicator />
      </View>
    ) : (
      <CustomErrorText
        text={categorized_error || "No items found"}
        darkMode={darkMode}
      />
    );

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {!categorized_loading && (
    <Text style={styles.category}>Category</Text>
  )}
        <FlatList
          data={filteredData}
          ListHeaderComponent={
            <View style={[styles.header, darkMode && styles.headerDark]}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScrollContainer}
              >
                <CategoryList
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </ScrollView>
            </View>
          }
          renderItem={renderDatalist}
          keyExtractor={(item) => item?.categoryId?.toString() || Math.random().toString()}
          ListEmptyComponent={renderEmptyComponent}
        />
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Back_Ground,
    alignItems: 'center'
  },
  darkContainer: {
    backgroundColor: BLACK_COLOR,
  },
  header: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: Back_Ground,
  },
  headerDark: {
    backgroundColor: BLACK_COLOR,
  },
  categoryScrollContainer: {
    paddingHorizontal: 16,
  },
  category: {
    fontSize: 20,
    fontWeight: "500",
    color: THEME_COLOR,
    paddingHorizontal: 16,
    alignSelf : 'flex-start'
  },
});
export default MenuScreen;