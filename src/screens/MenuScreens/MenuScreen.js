// /screens/MenuScreen/MenuScreen.js
import React, { useEffect, useState, useRef } from "react";
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
  const { fetchCategories, categories = [] } = useCategoryStore();
  const { selectedBranch } = useBranchStore();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const isFirstMount = useRef(true);
  const prevBranchRef = useRef(selectedBranch?._id);
  const hasCategoriesRef = useRef(false);

  useEffect(() => {
    if (selectedBranch?._id && (isFirstMount.current || prevBranchRef.current !== selectedBranch._id)) {
      // Fetch items only if needed
      if (categorized_items.length === 0 || prevBranchRef.current !== selectedBranch._id) {
        fetchItemsByBranch(selectedBranch._id);
      }

      // Fetch categories only if we don't have them or branch changed
      if (categories.length === 0 || prevBranchRef.current !== selectedBranch._id) {
        fetchCategories(selectedBranch._id);
      }

      prevBranchRef.current = selectedBranch._id;
      isFirstMount.current = false;
    }
  }, [selectedBranch, categories.length]);

  // Update hasCategoriesRef when categories change
  useEffect(() => {
    if (categories.length > 0) {
      hasCategoriesRef.current = true;
    }
  }, [categories]);

  // Update the filteredData logic in MenuScreen.js
  const filteredData = categorized_items
    .map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(category =>
      (selectedCategory === "all" || category.categoryId === selectedCategory) &&
      category.items.length > 0
    );

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
      <FlatList
        data={filteredData}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {!categorized_loading && (
              <Text style={styles.category}>Category</Text>
            )}
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
          </View>
        }
        renderItem={renderDatalist}
        keyExtractor={(item) => item?.categoryId?.toString() || Math.random().toString()}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
      />

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Back_Ground,
    // alignItems: 'center'
  },
  darkContainer: {
    backgroundColor: BLACK_COLOR,
  },
  header: {
    width: "100%",
    backgroundColor: Back_Ground,
    alignItems: 'center'
  },
  headerDark: {
    backgroundColor: BLACK_COLOR,
  },
  categoryScrollContainer: {
    paddingHorizontal: 6,
  },
  category: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: "500",
    color: THEME_COLOR,
    paddingHorizontal: 16,
    alignSelf: 'flex-start'
  },
});
export default MenuScreen;