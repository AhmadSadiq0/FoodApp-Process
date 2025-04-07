import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  WHITE_COLOR,
  THEME_COLOR,
  Back_Ground,
  BLACK_COLOR,
} from "../../res/colors";
import useThemeStore from "../../../zustand/ThemeStore";
import { Datalist } from "../../components";
import useAuthStore from "../../store/AuthStore";
import useSearchStore from "../../store/SearchStore";
import useItemStore from "../../store/ItemStore";
import useCategoryStore from "../../store/CategoryStore";

const MenuScreen = ({ navigation }) => {
  // State and store hooks
  const { darkMode } = useThemeStore();
  const { searchQuery } = useSearchStore();
  const {
    categorized_items = [],
    categorized_loading,
    categorized_error,
    fetchItemsByBranch,
  } = useItemStore();
  const {
    categories = [],
    categoriesLoading,
    categoriesError,
    fetchCategories,
  } = useCategoryStore();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchItemsByBranch("67c2cf8113ac30409ef067ec");
    fetchCategories();
  }, []);

  // Filter data based on selected category and search query
  const filteredData = categorized_items
    .filter(category => !selectedCategory || category.categoryId === selectedCategory)
    .map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) // Added missing closing parenthesis here
    }))
    .filter(category => category.items.length > 0);

  // Handle add to cart action
  const handleAddToCart = (item) => {
     navigation.navigate("AddItem", { item });
  };

  // Render individual category item
  const renderCategory = ({ item }) => {
    const isSelected = selectedCategory === item._id;
    const backgroundColor = isSelected ? THEME_COLOR : darkMode ? BLACK_COLOR : WHITE_COLOR;
    const textColor = isSelected ? WHITE_COLOR : darkMode ? WHITE_COLOR : THEME_COLOR;

    return (
      <TouchableOpacity
        style={[styles.categoryCard, { backgroundColor }]}
        onPress={() => setSelectedCategory(isSelected ? null : item._id)}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={[styles.categoryText, { color: textColor }]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // Render category list
  const renderCategoryList = () => {
    if (categoriesLoading) {
      return <LoadingIndicator />;
    }
    if (categoriesError) {
      return <ErrorText text={categoriesError} darkMode={darkMode} />;
    }
    return (
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.scrollContainer}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  // Render menu items list
  const renderDatalist = ({ item }) => (
    <Datalist
      title={item.categoryName}
      seeMoreText=""
      data={item.items}
      navigation={navigation}
      onAddToCart={handleAddToCart}
    />
  );

  // Render empty state
  const renderEmptyComponent = () => {
    if (categorized_loading) {
      return <LoadingIndicator height={300} />;
    }
    return <ErrorText text={categorized_error || "No items found"} darkMode={darkMode} />;
  };

  return (
    <View style={[styles.mainContainer, darkMode && styles.mainContainerDark]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={filteredData}
          ListHeaderComponent={
            <View style={[styles.header, darkMode && styles.headerDark]}>
              {renderCategoryList()}
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

// Reusable components
const LoadingIndicator = ({ height = 100 }) => (
  <View style={[styles.centerContainer, { height }]}>
    <ActivityIndicator size="large" color={THEME_COLOR} />
  </View>
);

const ErrorText = ({ text, darkMode }) => (
  <View style={styles.centerContainer}>
    <Text style={{ color: darkMode ? WHITE_COLOR : BLACK_COLOR }}>{text}</Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Back_Ground,
  },
  mainContainerDark: {
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
  scrollContainer: {
    paddingVertical: 16,
    justifyContent: "center",
    alignSelf: "center",
  },
  categoryCard: {
    width: 100,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    marginHorizontal: 10,
    marginTop: 5,
  },
  image: {
    width: 70,
    height: 60,
    borderRadius: 10,
    marginBottom: 8,
  },
  categoryText: {
    fontWeight: "400",
    textAlign: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MenuScreen;