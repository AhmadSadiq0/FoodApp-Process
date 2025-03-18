import React, { useState, useRef } from "react";
import { ScrollView, StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { WHITE_COLOR, THEME_COLOR, Back_Ground, GRAY_COLOR, BLACK_COLOR } from "../../res/colors";
import useThemeStore from "../../../zustand/ThemeStore";
import { Header, AddCard, Datalist, BurgerItem } from "../../components";
import { burgerData } from "../../data/ScreenData";
import { categories } from "../../data/ScreenData";
import useAuthStore from "../../store/AuthStore";

const MenuScreen = () => {
  const { user } = useAuthStore();
  const { darkMode } = useThemeStore();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const refRBSheet = useRef();

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    refRBSheet.current.open();
  };

  const renderCategory = ({ item }) => {
    const isSelected = selectedCategory === item.id;
    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          {
            backgroundColor: isSelected ? THEME_COLOR : darkMode ? BLACK_COLOR : WHITE_COLOR,
            marginTop: 30,
          },
        ]}
        onPress={() => setSelectedCategory(item.id)}
      >
        <Image
          source={item.image}
          style={[
            styles.image,
            {
              tintColor: isSelected ? WHITE_COLOR : darkMode ? WHITE_COLOR : THEME_COLOR,
            },
          ]}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.categoryText,
            {
              color: isSelected ? WHITE_COLOR : darkMode ? WHITE_COLOR : THEME_COLOR,
            },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.mainContainer, darkMode && styles.mainContainerDark]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <FlatList
          data={burgerData}
          ListHeaderComponent={
            <View style={[styles.header, darkMode && styles.headerDark]}>
              <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.scrollContainer}
                numColumns={3}
                showsVerticalScrollIndicator={false}
              />
              <View>
                <Datalist
                  title="Discount"
                  seeMoreText=""
                  data={burgerData}
                  onAddToCart={handleAddToCart}
                />
              </View>
              <View>
                <Datalist
                  title="Discounts"
                  seeMoreText=""
                  onSeeMorePress={() => console.log("See All pressed!")}
                  data={burgerData}
                  onAddToCart={handleAddToCart}
                />
              </View>
            </View>
          }
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        height={"auto"}
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
    height: 100,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  image: {
    width: 51,
    height: 50,
    marginBottom: 8,
  },
  categoryText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MenuScreen;