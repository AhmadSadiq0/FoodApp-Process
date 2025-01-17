import React, { useRef, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
//components
import { Header, Datalist, AddCard } from "../../components";
//res
import { WHITE_COLOR, Back_Ground, GRAY_COLOR, Green_Color,DARK_BACKGROUND,BLACK_COLOR} from "../../res/colors";
//data
import { burgerData } from "../../data/ScreenData";
//packages
import RBSheet from "react-native-raw-bottom-sheet";
//images 
import { BURGERIMG } from "../../res/drawables";
import useThemeStore from "../../../zustand/ThemeStore";

const HomeScreen = ({ navigation }) => {
  const refRBSheet = useRef();
  const [selectedBurger, setSelectedBurger] = useState(null);
  const { darkMode, toggleDarkMode } = useThemeStore();

  const handleAddToCart = (burger) => {
    setSelectedBurger(burger);
    refRBSheet.current.open();
  };

  const renderDatalist = ({ item }) => (
    <Datalist
      title={item.title}
      seeMoreText="See All"
      onSeeMorePress={() => console.log(`${item.title} See All pressed!`)}
      data={burgerData}
      onAddToCart={handleAddToCart}
    />
  );

  const datalistSections = [
    { id: 1, title: "Discounts" },
    { id: 2, title: "Deals" },
    { id: 3, title: "Loyalty Burgers" },
    { id: 4, title: "Loyalty Burger" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? BLACK_COLOR : Back_Ground }]}>
      <Header />
      <FlatList
        data={datalistSections}
        renderItem={renderDatalist}
        keyExtractor={(item) => item.id.toString()}
      />
      <RBSheet
        ref={refRBSheet}
        height={430}
        draggable={true}
        customStyles={{
          container: { borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center', backgroundColor: WHITE_COLOR },
          wrapper: { backgroundColor: 'transparent' },
          draggableIcon: { backgroundColor: GRAY_COLOR },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        {selectedBurger && (
          <AddCard
            name={selectedBurger.name}
            description="A delicious choice!"
            image={selectedBurger.image}
            price={selectedBurger.price}
            onAddToCart={() => console.log(`${selectedBurger.name} added to cart!`)}
          />
        )}
      </RBSheet>
    </View>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: 230,
  },
});