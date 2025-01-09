import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { IMAGE29 } from "../../res/drawables";
import CustomButton from "../../components/CustomButtom";
import { useNavigation } from "@react-navigation/native";
import { THEME_COLOR, THEME_TEXT_COLOR, WHITE_COLOR } from "../../res/colors";

const ConfirmedOrder = () => {
  const navigation = useNavigation();

  const navigateToMenu = () => {
    navigation.navigate("Menu");
  };

  const navigateToCart = () => {
    navigation.navigate("Cart");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={IMAGE29} style={styles.image} />
        <Text style={styles.titleText}>Order placed successfully!</Text>
        <Text style={styles.subtitleText}>Cannot be canceled now!</Text>
      </View>
      <View style={styles.footer}>
        <CustomButton
          title="Back To Menu"
          textStyle={styles.menuButtonText}
          style={styles.menuButton}
          onPress={navigateToMenu}
        />
        <CustomButton
          title="Back To Cart"
          textStyle={styles.cartButtonText}
          style={styles.cartButton}
          onPress={navigateToCart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 170,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: WHITE_COLOR,
    padding: 16,
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
  subtitleText: {
    fontSize: 16,
    color: THEME_COLOR,
    marginBottom: 30,
  },
  footer: {
    alignItems: "center",
  },
  menuButton: {
    borderColor: THEME_COLOR,
    backgroundColor: WHITE_COLOR,
    marginBottom: 10,
  },
  menuButtonText: {
    color: THEME_COLOR,
  },
  cartButton: {
    paddingHorizontal: 85,
    justifyContent: "center",
    alignItems: "center",
  },
  cartButtonText: {
    color: WHITE_COLOR,
  },
});

export default ConfirmedOrder;
