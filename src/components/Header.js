import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
//colors
import {
  THEME_COLOR,
  WHITE_COLOR,
  Green_Color,
  THEME_TEXT_COLOR,
  Back_Ground,
  BLACK_COLOR
} from "../res/colors";
//icon
import { Profie_Image, Bell_ICON, Search_Icon } from "../res/drawables";
// SearchBar Component
const SearchBar = ({ placeholder }) => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchBar}
      placeholder={placeholder}
      placeholderTextColor={THEME_TEXT_COLOR}
    />
    <Image source={Search_Icon} style={styles.searchIcon} />
  </View>
);

// Header Component
const Header = (props) => {
  const {
    username = "Huzaifa Saddique",
    title = "Ahmad Kitchen",
    Welcomermsg = "Welcome to",
    containerStyle = {},
    textContainer = {},
    showSearch = true,
    showShadow = false,
    onNotificationPressed,
  } = props;
  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.container,
          containerStyle,
          showShadow && styles.shadowContainer,
        ]}
      >
        <View style={styles.profileContainer}>
          <Image source={Profie_Image} style={styles.image} />
          <Text style={styles.usernameText}>{username}</Text>
          <View style={styles.bellContainer}>
            {onNotificationPressed && (
              <>
                <TouchableOpacity onPress={onNotificationPressed}>
                  <Image source={Bell_ICON} style={styles.bellIcon} />
                </TouchableOpacity>
                <View style={styles.notificationBadge} />
              </>
            )}
          </View>
        </View>
        <View style={[styles.textContainer, textContainer]}>
          <Text style={styles.welcomeText}>{Welcomermsg}</Text>
          <Text style={styles.kitchenText}>{title}</Text>
        </View>
        {showSearch && (
          <SearchBar placeholder="Search Your Favourite Food Item" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Back_Ground,
  },
  container: {
    height: 200,
    width: "100%",
    padding: 30,
    marginBottom: 40,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: THEME_COLOR,
    alignItems: "center",
  },
  shadowContainer: {
    shadowColor: BLACK_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: WHITE_COLOR,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: WHITE_COLOR,
    marginRight: 50,
  },
  searchBar: {
    height: 65,
    backgroundColor: Back_Ground,
    borderRadius: 50,
    paddingLeft: 50,
    width: "100%",
    marginTop: 30,
    color: THEME_TEXT_COLOR,
    shadowColor: BLACK_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: WHITE_COLOR,
    textAlign: "center",
  },
  kitchenText: {
    fontSize: 32,
    fontWeight: "bold",
    color: WHITE_COLOR,
    textAlign: "center",
    fontFamily: "Ribeye",
  },
  bellContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellIcon: {
    width: 25,
    height: 25,
  },
  notificationBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Green_Color,
    position: "absolute",
    right: 0,
    top: 0,
  },
  searchContainer: {
    width: "100%",
    marginTop: -30,
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: 20,
    top: 50,
    width: 25,
    height: 25,
  },
});

export default Header;
