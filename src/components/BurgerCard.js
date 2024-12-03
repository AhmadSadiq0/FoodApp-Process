  import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { BURGERIMG } from '../res/drawables';

const BurgerCard = ({ name, price, image, onAdd }) => {
  return (
    <View style={styles.card}>
      <Image source={BURGERIMG} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{`Rs. ${price}/-`}</Text>
      <Text style={styles.serving}>Single Serving</Text>
      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: 150,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#4b0082',
  },
  price: {
    fontSize: 12,
    color: '#333',
  },
  serving: {
    fontSize: 10,
    color: '#888',
  },
  addButton: {
    marginTop: 1,
    // marginLeft:20, 
    alignSelf: 'flex-end',
    marginBottom:1,
    width: 30,
    height: 30,
    backgroundColor: '#ff0000',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',  },
});
export default BurgerCard;
