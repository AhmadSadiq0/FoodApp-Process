import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
// Components
import { Datalist, AddCard } from "../../components";
// Stores
import useItemStore from "../../store/ItemStore";
// Images
import { ARROW_ICON } from "../../res/drawables";
// Colors
import { THEME_COLOR, WHITE_COLOR, GRAY_COLOR, Back_Ground } from "../../res/colors";

const OffersScreen = ({ navigation }) => {
  const route = useRoute();
  const { categoryId, title } = route.params;
  const { categorized_items } = useItemStore();
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const refRBSheet = useRef();

  useEffect(() => {
    const category = categorized_items.find(item => item.categoryId === categoryId);
    setFilteredItems(category?.items || []);
  }, [categorized_items, categoryId]);

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    refRBSheet.current.open();
  };

  const renderItem = ({ item }) => (
    <Datalist
      onSeeMorePress={() => navigation.navigate('Offers', { title: item.name, categoryId: item.categoryId })}
      data={[item]}
      onAddToCart={() => handleAddToCart(item)}
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

      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ActivityIndicator size="large" color={THEME_COLOR} />
      )}

      <RBSheet
        ref={refRBSheet}
        height={430}
        draggable={true}
        customStyles={{
          container: styles.bottomSheet,
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
          />
        )}
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: Back_Ground, 
  },
  headerRow: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  arrowIcon: {
    width: 40,
    height: 40,
    tintColor: THEME_COLOR,
    marginRight: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: THEME_COLOR,
  },
  columnWrapper: {
    justifyContent: 'space-between'
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    backgroundColor: WHITE_COLOR,
  }
});

export default OffersScreen;