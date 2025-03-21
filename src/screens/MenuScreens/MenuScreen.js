import React, { useState, useRef, useEffect } from "react";
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
import RBSheet from "react-native-raw-bottom-sheet";
import {
  WHITE_COLOR,
  THEME_COLOR,
  Back_Ground,
  GRAY_COLOR,
  BLACK_COLOR,
} from "../../res/colors";
import useThemeStore from "../../../zustand/ThemeStore";
import { Header, AddCard, Datalist, BurgerItem } from "../../components";
import useAuthStore from "../../store/AuthStore";
import useSearchStore from "../../store/SearchStore";
import useItemStore from "../../store/ItemStore";
import useCategoryStore from "../../store/CategoryStore"; // Import the category store

const MenuScreen = () => {
  const { user } = useAuthStore();
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
  const [selectedItem, setSelectedItem] = useState(null);
  const refRBSheet = useRef();

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    refRBSheet.current.open();
  };

  
  useEffect(() => {
    fetchItemsByBranch("67c2cf8113ac30409ef067ec"); 
    fetchCategories(); 
  }, []);

  // Filter categorized items based on search query
  const filteredData = categorized_items
  .filter(category => 
    !selectedCategory || category.categoryId == selectedCategory // Filter by categoryId
  )
  .map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }))
  .filter(category => category.items.length > 0); // Ensure only categories with items are shown


  // Render each category item
  const renderCategory = ({ item }) => {
    const isSelected = selectedCategory == item._id;
    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          {
            backgroundColor: isSelected
              ? THEME_COLOR
              : darkMode
              ? BLACK_COLOR
              : WHITE_COLOR,
            marginTop: 5,
          },
        ]}
        onPress={() => { selectedCategory == item._id ? setSelectedCategory(null) : setSelectedCategory(item._id)}}
      >
        <Image
          source={{ uri: item.image }} 
          style={[
            styles.image,
            // {
            //   tintColor: isSelected
            //     ? WHITE_COLOR
            //     : darkMode
            //     ? WHITE_COLOR
            //     : THEME_COLOR,
            // },
          ]}
          resizeMode="cover"
        />
        <Text
          style={[
            styles.categoryText,
            {
              color: isSelected
                ? WHITE_COLOR
                : darkMode
                ? WHITE_COLOR
                : THEME_COLOR,
            },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // Render the list of categories
  const renderCategoryList = () => {
    if (categoriesLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 100,
          }}
        >
          <ActivityIndicator size="large" color={THEME_COLOR} />
        </View>
      );
    }
    if (categoriesError) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 100,
          }}
        >
          <Text style={{ color: darkMode ? WHITE_COLOR : BLACK_COLOR }}>
            {categoriesError}
          </Text>
        </View>
      );
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

  // Render each item in the categorized list
  const renderDatalist = ({ item }) => (
    <Datalist
      title={item.categoryName}
      seeMoreText=""
      onSeeMorePress={() => console.log("See All pressed!")}
      data={item.items}
      onAddToCart={handleAddToCart}
    />
  );

  return (
    <View style={[styles.mainContainer, darkMode && styles.mainContainerDark]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <FlatList
          data={filteredData}
          ListHeaderComponent={
            <View style={[styles.header, darkMode && styles.headerDark]}>
              {renderCategoryList()}
            </View>
          }
          renderItem={renderDatalist}
          keyExtractor={(item) => item?.categoryId?.toString() || Math.random().toString()}
          ListEmptyComponent={() => {
            if (categorized_loading) {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 300,
                  }}
                >
                  <ActivityIndicator size="large" color={THEME_COLOR} />
                </View>
              );
            }
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>
                  {categorized_error ? categorized_error : "No items found"}
                </Text>
              </View>
            );
          }}
        />
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        height={500}
        draggable={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: "center",
            backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR,
          },
          wrapper: { backgroundColor: "transparent" },
          draggableIcon: { backgroundColor: GRAY_COLOR },
        }}
      >
        <ScrollView>
          <BurgerItem selectedItem={selectedItem} />
        </ScrollView>
      </RBSheet>
    </View>
  );
};

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
    padding : 8,
    marginHorizontal: 10,
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
});
export default MenuScreen;