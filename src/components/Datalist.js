import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BurgerCard from './BurgerCard';

const Datalist = ({ title, seeMoreText, onSeeMorePress, data }) => {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.seeMore} onPress={onSeeMorePress}>
          {seeMoreText}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => (
          <BurgerCard
            name={item.name}
            price={item.price}
            image={item.image}
            onAdd={() => console.log(`${item.name} added to cart!`)}
          />
        )}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  seeMore: {
    fontSize: 14,
    fontWeight: '600',
    color: 'purple',
  },
  list: {
    paddingHorizontal: 10,
  },
});

export default Datalist;
