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
import useNotificationStore from '../../store/NotificationStore';
import useAuthStore from '../../store/AuthStore';
// Colors
import { WHITE_COLOR, Back_Ground, BLACK_COLOR, THEME_COLOR, GRAY_COLOR } from "../../res/colors";
import * as Notifications from 'expo-notifications';
// Screens
const HomeScreen = ({ navigation }) => {
  const { darkMode } = useThemeStore();
  const { searchQuery } = useSearchStore();
  const { saveExpoPushToken , expoPushToken } = useNotificationStore();
  const { user } = useAuthStore();
  const {
    fetchHomeSectionItems,
    homeSectionItems,
    homeSectionItemsLoading,
    homeSectionItemsError
  } = useItemStore();
  const { fetchBranches, selectedBranch } = useBranchStore();
  const isFirstMount = useRef(true);
  const prevBranchRef = useRef(selectedBranch?._id);

  useEffect(() => {
    // Fetch branches only on first mount
    if (isFirstMount.current) {
      fetchBranches();
      isFirstMount.current = false;
    }

    // Only fetch items if:
    // 1. We have a selected branch AND
    // 2. Either:
    //    a. We have no items yet OR
    //    b. The branch has changed
    if (selectedBranch?._id && 
       (homeSectionItems.length === 0 || prevBranchRef.current !== selectedBranch._id)) {
      fetchHomeSectionItems(selectedBranch._id);
      prevBranchRef.current = selectedBranch._id;
    }
  }, [selectedBranch]);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      console.log("before")
      if (!user) return;
      console.log("after")
      let token;
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      try {
        token = (await Notifications.getExpoPushTokenAsync()).data;
        if (token != expoPushToken) {
          await saveExpoPushToken(token);
          console.log("token is", token)
        }
      } catch (error) {
        console.log(error)
      }

    };
    registerForPushNotificationsAsync();
  }, [user]);

  const filteredData = homeSectionItems
    .map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(category => category.items.length > 0);

  const handleAddToCart = (burger) => {
    navigation.navigate('itemDetail', { item: burger });
  };
  const handleSeeMorePress = (title, categoryId) => {
    navigation.navigate('SeeAll', { title, categoryId, isHome: true });
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
        textColor={darkMode ? GRAY_COLOR : BLACK_COLOR}
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
      <Text style={{ color: darkMode ? GRAY_COLOR : BLACK_COLOR }}>
        {homeSectionItemsError || "No items found"}
      </Text>
    </View>
  );

  return (
    <View style={[styles.mainContainer, darkMode && styles.mainContainerDark]}>
      <FlatList
        data={filteredData}
        renderItem={renderDatalist}
        keyExtractor={(item) => item?.categoryId.toString()}
        ListEmptyComponent={homeSectionItemsLoading ? renderLoading : renderEmpty}
        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
         showsVerticalScrollIndicator={false}
        style={darkMode && styles.scrollViewDark}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 15,
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
    // height: 300
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default HomeScreen;