//Hooks
import React, { useRef, useState , useEffect} from "react";
import { StyleSheet, View, FlatList , Text , ScrollView  } from "react-native";
//components
import { Header, Datalist, AddCard } from "../../components";
//res
import { WHITE_COLOR, Back_Ground, GRAY_COLOR, Green_Color,DARK_BACKGROUND,BLACK_COLOR, THEME_COLOR} from "../../res/colors";
//data
import { burgerData } from "../../data/ScreenData";
//packages
import RBSheet from "react-native-raw-bottom-sheet";
//images
import { BURGERIMG, HEART_ICON } from "../../res/drawables";
//stores
import useThemeStore from "../../../zustand/ThemeStore";
import CustomButton from "../../components/CustomButtom";
import useAuthStore from "../../store/AuthStore";
import useItemStore from "../../store/ItemStore";
import { ActivityIndicator } from "react-native";
import useBranchStore from "../../store/BranchStore";

 
const HomeScreen = ({ navigation }) => {
  const {user} = useAuthStore();
  const { branches, branches_loading, branches_error, fetchBranches } = useBranchStore(); 
  const { categorized_items, categorized_loading, categorized_error , fetchItemsByBranch } = useItemStore();
  const refRBSheet = useRef();
  const [selectedBurger, setSelectedBurger] = useState(null);
  const { darkMode, toggleDarkMode } = useThemeStore();
  const [showFavorites, setShowFavorites] = useState(false);
  const [burgerList, setBurgerList] = useState(
    burgerData.map(burger => ({ ...burger, isFavorite: false }))
  );

  const getBranches = async () => {
    await fetchBranches();
  };

  const handleAddToCart = (burger) => {
    setSelectedBurger(burger); 
    refRBSheet.current.open();
  };
  const handleSeeMorePress = (title , categoryId) => {
    console.log("Navigating to Offers with categoryId:", categoryId);
    navigation.navigate('Offers', { title, categoryId: categoryId });
  };
  const toggleFavorite = (burgerId) => {
    setBurgerList(prev => prev.map(burger =>
      burger.id === burgerId ? { ...burger, isFavorite: !burger.isFavorite } : burger
    ));
  };

  const getCategorizedItems = async () => {
    fetchItemsByBranch("67c2cf8113ac30409ef067ec")
  };

  useEffect(() => { 
    getCategorizedItems();  
    getBranches();
  }, []);

  const renderDatalist = ({ item }) => (
    <Datalist
      title={item.categoryName}
      seeMoreText="See All"
      onSeeMorePress={() => handleSeeMorePress(item.categoryName , item.categoryId)}
      data={item.items}
      onAddToCart={handleAddToCart}
      onToggleFavorite={toggleFavorite}
    />
  );

  const datalistSections = [
    { id: 1, title: "Discounts" },
    { id: 2, title: "Deals" },
    { id: 3, title: "Loyalty Burgers" },
    { id: 4, title: "Loyalty Burger" },
  ];

  useEffect(() => {
          console.log("this user data" , user)
      },[])

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? BLACK_COLOR : Back_Ground }]}>
      {/* <Header navigation={navigation} username = {user.username} /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
      {/* <CustomButton image={HEART_ICON} title="My Favourites"  onPress={() => setShowFavorites(!showFavorites)}   style={[
    styles.favoriteButton,
    { backgroundColor: darkMode ? BLACK_COLOR : THEME_COLOR },
  ]}   textStyle={{ color: darkMode ? WHITE_COLOR : WHITE_COLOR }}/> */}
      <FlatList
         data={categorized_items}
         renderItem={renderDatalist}
        keyExtractor={(item) => item?.categoryId.toString()}
        // ListEmptyComponent={() => {
        //   categorized_loading ? <ActivityIndicator size="large" color={THEME_COLOR} /> :
        //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        //       <Text>{categorized_error ? categorized_error : "No items found"}</Text>
        //   </View>
        // }}
        ListEmptyComponent={() => {
          if (categorized_loading) {
            return (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 300 }}>
                <ActivityIndicator size="large" color={THEME_COLOR} />
              </View>
            );
          }
          return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>{categorized_error ? categorized_error : "No items found"}</Text>
            </View>
          );
        }}

      />
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        height={"auto"}
        draggable={true}
        customStyles={{
          container: { borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center',  backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR, },
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
            description="A delicious choice!!!"
            image={selectedBurger.image}
            price={selectedBurger.price}
            onAddToCart={() => console.log(`${selectedBurger.name} added to cart!`)}
            onToggleFavorite={() => toggleFavorite(selectedBurger.id)}
          />
        )}
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favoriteButton: {
    width:"96%",
   fontFamily: 'Lato',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:7,
    borderRadius: 10,
  },
});

export default HomeScreen;
