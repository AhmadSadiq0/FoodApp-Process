import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
//RawBottomSheet
import RBSheet from "react-native-raw-bottom-sheet"; 
//Colors
import { WHITE_COLOR,THEME_COLOR, Back_Ground, GRAY_COLOR , BLACK_COLOR, LIGHT_THEME_BACKGROUND} from "../../res/colors";
//Components
import { Header,AddCard,Datalist,BurgerItem } from "../../components";
//data
import { burgerData } from "../../data/ScreenData";
import { categories } from "../../data/ScreenData";

const MenuScreen = () => {
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
        style={[styles.categoryCard, {
          backgroundColor: isSelected ? THEME_COLOR : WHITE_COLOR,
          marginTop: 30,
        }]}
        onPress={() => setSelectedCategory(item.id)}
      >
        <Image
          source={item.image}
          style={[styles.image, { tintColor: isSelected ? WHITE_COLOR : THEME_COLOR }]}
          resizeMode="contain"
        />
        <Text style={[styles.categoryText, { color: isSelected ? WHITE_COLOR : THEME_COLOR }]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Header />
      <FlatList
        data={burgerData}
        ListHeaderComponent={
          <View style={styles.header}>
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.scrollContainer}
              numColumns={3}
              showsVerticalScrollIndicator={false}
            />
            <View>
              <Datalist title="Discount" seeMoreText="" data={burgerData} onAddToCart={handleAddToCart} />
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
      <RBSheet
  ref={refRBSheet}
  height={430}
  draggable={true}
  customStyles={{
    container: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: "center",
      backgroundColor: WHITE_COLOR,
    },
    wrapper: { backgroundColor: LIGHT_THEME_BACKGROUND },
    draggableIcon: { backgroundColor: GRAY_COLOR },
  }}
>
<BurgerItem selectedItem={selectedItem} />
</RBSheet>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Back_Ground,
  },
  header: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: Back_Ground,
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