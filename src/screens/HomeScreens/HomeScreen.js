import React, { useRef, useState, useEffect } from "react";
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Text, 
  ScrollView, 
  ActivityIndicator
} from "react-native";
// Components
import { Datalist } from "../../components";
// Stores
import useItemStore from "../../store/ItemStore";
import useBranchStore from "../../store/BranchStore";
import useSearchStore from "../../store/SearchStore";
import useThemeStore from "../../../zustand/ThemeStore";
// Colors
import { WHITE_COLOR, Back_Ground, BLACK_COLOR, THEME_COLOR } from "../../res/colors";
// Screens

const HomeScreen = ({ navigation }) => {
  const { darkMode } = useThemeStore();
  const { searchQuery } = useSearchStore();
  const { 
    fetchHomeSectionItems, 
    homeSectionItems, 
    homeSectionItemsLoading, 
    homeSectionItemsError 
  } = useItemStore();
  const { fetchBranches,selectedBranch } = useBranchStore();

  useEffect(() => { 
    if (selectedBranch) {
      fetchHomeSectionItems(selectedBranch._id);  
    }
    fetchBranches();
  }, [selectedBranch]);

  const filteredData = homeSectionItems
    .map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(category => category.items.length > 0);
  useEffect(() => { 
    fetchHomeSectionItems("67c2cf8113ac30409ef067ec");  
    fetchBranches();
  }, []);

  const handleAddToCart = (burger) => {
    navigation.navigate('itemDetail', { item: burger });
  };

  const handleSeeMorePress = (title, categoryId) => {
    navigation.navigate('SeeAll', { title, categoryId , isHome : true });
  };

  const renderDatalist = ({ item, index }) => {
    const isLastArray = index == filteredData.length - 1;
    console.log(isLastArray)
    return (
      <Datalist
        title={item.categoryName}
        seeMoreText="See All"
        onSeeMorePress={() => handleSeeMorePress(item.categoryName, item.categoryId)}
        data={item.items}
        onAddToCart={handleAddToCart}
        darkMode={darkMode}
        isLastArray={isLastArray}  
      />
    );
  };

  // Render loading indicator
  const renderLoading = () => (
    <View style={[styles.centerContainer, { height: 300 }]}>
      <ActivityIndicator size="large" color={THEME_COLOR} />
    </View>
  );

  // Render error or empty state
  const renderEmpty = () => (
    <View style={styles.centerContainer}>
      <Text style={{ color: darkMode ? WHITE_COLOR : BLACK_COLOR }}>
        {homeSectionItemsError || "No items found"}
      </Text>
    </View>
  );

  return (
    <View style={[styles.mainContainer, darkMode && styles.mainContainerDark]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={darkMode && styles.scrollViewDark}
      >
        <FlatList
          data={filteredData}
          renderItem={renderDatalist}
          keyExtractor={(item) => item?.categoryId.toString()}
          ListEmptyComponent={homeSectionItemsLoading ? renderLoading : renderEmpty}
          contentContainerStyle={styles.contentContainer}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop : 15,
    backgroundColor: Back_Ground,
  },
  mainContainerDark: {
    backgroundColor: BLACK_COLOR,
  },
  scrollViewDark: {
    backgroundColor: BLACK_COLOR,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    height: 300
  },
  emptyContainer: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  }
});

export default HomeScreen;