import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
//Images
import { IMAGE29 } from "../../res/drawables";
//CustomButton
import { CustomButton, Header1 } from "../../components";
//Navigation
import { useNavigation } from "@react-navigation/native";
//Colors
import { THEME_COLOR, THEME_TEXT_COLOR, WHITE_COLOR, BLACK_COLOR } from "../../res/colors";
//Store
import useThemeStore from "../../../zustand/ThemeStore";

const ConfirmedOrder = () => {
  const navigation = useNavigation();
  const { darkMode } = useThemeStore();

  const navigateToMenu = () => { 
    navigation.navigate("Menu");
  };
  const navigateToCart = () => {
    navigation.navigate("Cart");
  };

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <Header1 title="Order Confirmed" discountIcon={false} style={styles.header}/>
      <View style={styles.content}>
        <Image source={IMAGE29} style={styles.image} />
        <Text style={[styles.titleText, darkMode && styles.titleTextDark]}>Order placed successfully!</Text>
        <Text style={[styles.subtitleText, darkMode && styles.subtitleTextDark]}>Cannot be canceled now!</Text>
      </View>
      <View style={styles.footer}>
        <CustomButton
          title="Back To Menu"
          textStyle={[styles.menuButtonText, darkMode && styles.menuButtonTextDark]}
          style={[styles.menuButton, darkMode && styles.menuButtonDark]}
          onPress={navigateToMenu}
        />
        <CustomButton
          title="Back To Cart"
          textStyle={[styles.cartButtonText, darkMode && styles.cartButtonTextDark]}
          style={[styles.cartButton, darkMode && styles.cartButtonDark]}
          onPress={navigateToCart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: WHITE_COLOR,
    // padding: 16,
  },
  containerDark: {
    backgroundColor: BLACK_COLOR,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 50,
    marginBottom: 40,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME_TEXT_COLOR,
    marginBottom: 5,
  },
  titleTextDark: {
    color: WHITE_COLOR,
  },
  subtitleText: {
    fontSize: 16,
    color: THEME_COLOR,
    marginBottom: 30,
  },
  subtitleTextDark: {
    color: WHITE_COLOR,
  },
  footer: {
    alignItems: "center",
  },
  menuButton: {
    borderColor: THEME_COLOR,
    backgroundColor: WHITE_COLOR,
    marginBottom: 10,
  },
  menuButtonDark: {
    backgroundColor: BLACK_COLOR,
  },
  menuButtonText: {
    color: THEME_COLOR,
  },
  menuButtonTextDark: {
    color: WHITE_COLOR,
  },
  cartButton: {
    paddingHorizontal: 85,
    justifyContent: "center",
    alignItems: "center",
  },
  cartButtonDark: {
    backgroundColor: THEME_COLOR,
  },
  cartButtonText: {
    color: WHITE_COLOR,
  },
  cartButtonTextDark: {
    color: BLACK_COLOR,
  },
  header:{
    width:"100%",
    
  }
});

export default ConfirmedOrder;
