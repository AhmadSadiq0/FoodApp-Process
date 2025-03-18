import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, Text, ActivityIndicator, StyleSheet,TouchableOpacity,Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import useItemStore from "../../store/ItemStore";
import AddCard from "../../components/AddCard";
import RBSheet from "react-native-raw-bottom-sheet";
import { Datalist } from "../../components";
import { ARROW_ICON } from "../../res/drawables";
import { THEME_COLOR, WHITE_COLOR, GRAY_COLOR, DARK_THEME_BACKGROUND, DARK_THEME_TEXT_COLOR, Back_Ground } from "../../res/colors";

const OffersScreen = ({ navigation }) => {
  const route = useRoute();
  const { categoryId, title } = route.params;
  const { categorized_items, categorized_loading, categorized_error } = useItemStore();
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const refRBSheet = useRef();

  useEffect(() => {
    const category = categorized_items.find(item => item.categoryId === categoryId);
    if (category) {
      setFilteredItems(category.items);
    }
  }, [categorized_items, categoryId]);

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    refRBSheet.current.open();
  };

  const toggleFavorite = (itemId) => {
    setFilteredItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const renderItem = ({ item }) => (
    <Datalist
      onSeeMorePress={() => navigation.navigate('Offers', { title: item.name, categoryId: item.categoryId })}
      data={[item]}
      onAddToCart={() => handleAddToCart(item)}
      onToggleFavorite={() => toggleFavorite(item.id)}
    />
  );

  return (
    <View style={styles.container}>
<View style={styles.headerRow}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ARROW_ICON} style={styles.arrowIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
      {categorized_loading ? (
        <ActivityIndicator size="large" color={THEME_COLOR} />
      ) : filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noItemsText}>No items found for this category</Text>
      )}

      {/* Bottom Sheet for AddCard */}
      <RBSheet
        ref={refRBSheet}
        height={430}
        draggable={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: 'center',
            backgroundColor: WHITE_COLOR, 
          },
          wrapper: { backgroundColor: 'transparent' },
          draggableIcon: { backgroundColor: GRAY_COLOR },
        }}
      >
        {selectedItem && (
          <AddCard
            name={selectedItem.name}
            description="A delicious choice!!!"
            image={selectedItem.image}
            price={selectedItem.price}
            onAddToCart={() => handleAddToCart(selectedItem)}
            onToggleFavorite={() => toggleFavorite(selectedItem.id)}
          />
        )}
      </RBSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop:30,
    padding:14,
    backgroundColor: Back_Ground, 
  },
  noItemsText: {
    color: DARK_THEME_TEXT_COLOR,
    textAlign: 'center',
    marginTop:0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 20,
    marginTop: 25,
  },
  arrowIcon: {
    width: 40,
    height: 40,
    tintColor: THEME_COLOR,
    marginRight: 15,
},
  title: {
    // padding:14,
    fontSize: 22,
    fontWeight: 600,
    color: THEME_COLOR,
    
  },
});

export default OffersScreen;