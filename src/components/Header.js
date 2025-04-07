import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
// Importing Colors
import {
  THEME_COLOR,
  WHITE_COLOR,
  Green_Color,
  THEME_TEXT_COLOR,
  Back_Ground,
  BLACK_COLOR,
} from "../res/colors";
import useSearchStore from "../store/SearchStore";
import useBranchStore from "../store/BranchStore";
import useThemeStore from "../../zustand/ThemeStore";

// Importing Icons
import { Profie_Image, Bell_ICON, Search_Icon, LOCATION_ICON } from "../res/drawables";

const BranchDropdown = ({ darkMode }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { branches, selectedBranch, setSelectedBranch } = useBranchStore();
  const { searchQuery, setSearchQuery } = useSearchStore();

  return (
    <View style={styles.branchContainer}>
      <TouchableOpacity
        style={[styles.branchButton, darkMode && { backgroundColor: BLACK_COLOR }]}
        onPress={() => setShowDropdown(true)}
      >
        <View style={styles.branchButtonContent}>
          <Image 
            source={LOCATION_ICON} 
            style={[styles.locationIcon, darkMode && { tintColor: WHITE_COLOR }]} 
          />
          <Text style={[styles.branchText, darkMode && { color: WHITE_COLOR }]}>
            {selectedBranch?.location || "Select Branch"}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={showDropdown}
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={[styles.dropdownContainer, darkMode && { backgroundColor: BLACK_COLOR }]}>
          <FlatList
            data={branches}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  item._id === selectedBranch?._id && [
                    styles.selectedDropdownItem,
                    darkMode && { backgroundColor: THEME_COLOR }
                  ],
                  darkMode && { borderBottomColor: '#444' }
                ]}
                onPress={() => {
                  setSelectedBranch(item);
                  setShowDropdown(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    darkMode && { color: WHITE_COLOR },
                    item._id === selectedBranch?._id && [
                      styles.selectedDropdownText,
                      darkMode && { color: WHITE_COLOR }
                    ]
                  ]}
                >
                  {item.location}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const Header = (props) => {
  const { darkMode } = useThemeStore();
  const { 
    selectedBranch, 
    setSelectedBranch, 
    fetchBranches, 
    branches 
  } = useBranchStore();
  const { searchQuery, setSearchQuery } = useSearchStore();

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  const {
    username = "Huzaifa Saddique",
    Welcomermsg = "Welcome to",
    containerStyle = {},
    textContainer = {},
    showSearch = true,
    showShadow = false,
    showBellIcon = true,
    onNotificationPressed,
    navigation,
  } = props;

  const handleSearch = (query) => {
    setSearchQuery(query); 
  };

  return (
    <View style={[styles.mainContainer, darkMode && { backgroundColor: BLACK_COLOR }]}>
      <View
        style={[
          styles.container,
          containerStyle,
          showShadow && styles.shadowContainer,
          darkMode && { backgroundColor: BLACK_COLOR }
        ]}
      >
        <View style={styles.profileContainer}>
          <Image source={Profie_Image} style={styles.image} />
          <Text
            style={[
              styles.usernameText,
              { marginRight: showBellIcon ? 90 : 140 },
              darkMode && { color: WHITE_COLOR }
            ]}
          >
            {username}
          </Text>

          {showBellIcon && (
            <View style={styles.bellContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
                <Image 
                  source={Bell_ICON} 
                  style={[styles.bellIcon, darkMode && { tintColor: WHITE_COLOR }]} 
                />
              </TouchableOpacity>
              <View style={styles.notificationBadge} />
            </View>
          )}
        </View>
        <View style={[styles.textContainer, textContainer]}>
          <Text style={[styles.welcomeText, darkMode && { color: WHITE_COLOR }]}>
            {Welcomermsg}
          </Text>
         
          <BranchDropdown
            selectedBranch={selectedBranch}
            onSelectBranch={setSelectedBranch}
            branches={branches}
            darkMode={darkMode}
          />
        </View>

        {showSearch && (
          <View style={styles.searchContainer}>
            <TextInput
              style={[
                styles.searchBar,
                darkMode && { 
                  backgroundColor: '#333',
                  color: WHITE_COLOR,
                  placeholderTextColor: '#aaa'
                }
              ]}
              placeholder="Search Your Favourite Food Item"
              placeholderTextColor={darkMode ? '#aaa' : THEME_TEXT_COLOR}
              onChangeText={handleSearch}
            />
            <Image 
              source={Search_Icon} 
              style={[styles.searchIcon, darkMode && { tintColor: WHITE_COLOR }]} 
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Back_Ground,
    paddingBottom: 20,
  },
  container: {
    height: 230,
    width: "100%",
    padding: 30,
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
    marginRight: 90,
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
    width: 37,
    height: 37,
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
  searchIcon: {
    position: "absolute",
    left: 20,
    top: 50,
    width: 25,
    height: 25,
  },
  branchContainer: {
    marginTop: 5,
    alignItems: "center",
    marginBottom: 5,
  },
  branchButton: {
    backgroundColor: THEME_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, 
  },
  branchText: {
    fontSize: 23,
    color: WHITE_COLOR,
    fontWeight: "bold",
  },
  dropdownContainer: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    width: "50%", 
    maxHeight: 300,
    elevation: 5,
    position: "absolute",
    top: "17%",
    left: "28%", 
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: 'row', 
    alignItems: 'center',
  },
  selectedDropdownItem: {
    backgroundColor: THEME_TEXT_COLOR,
  },
  dropdownText: {
    fontSize: 16,
    color: BLACK_COLOR,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 10, 
    resizeMode: "contain", 
    tintColor: "white",
  },
  branchButtonContent: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10, 
  },
  selectedDropdownText: {
    color: WHITE_COLOR, 
  },
  modalOverlay: {
    flex: 1,
  },
});

export default Header;