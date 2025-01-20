import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
//component 
import { Datalist, AddCard } from "../../components"; 
//colors
import { WHITE_COLOR } from '../../res/colors'; 

const DealsScreen = ({ data }) => {
  const renderItem = ({ item }) => (
    <Datalist
      title={item.title}
      seeMoreText="See All"
      onSeeMorePress={() => console.log(`${item.title} See All pressed!`)}
      data={item.data}
    />
  );

  const addCardData = {
    name: "2 Double Cheese Burger",
    description: "Double Delight",
    image: data[0]?.data[0]?.image, 
    price: 84,
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={
          <View style={styles.addCardContainer}>
            <AddCard
              name={addCardData.name}
              description={addCardData.description}
              image={addCardData.image}
              price={addCardData.price}
              onAddToCart={() => console.log(`${addCardData.name} added to cart`)}
            />
          </View>
        }
      />
    </View>
  );
};

export default DealsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addCardContainer: {
    marginTop: 20,
  },
});
