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
import {
  THEME_COLOR,
  WHITE_COLOR,
  THEME_TEXT_COLOR,
  Back_Ground,
  BLACK_COLOR,
  INPUT_BACK_COLOR,
  DARK_INPUT_BACK_COLOR
} from "../res/colors";
import useSearchStore from "../store/SearchStore";
import useBranchStore from "../store/BranchStore";
import useThemeStore from "../../zustand/ThemeStore";
import { NOTIFICATION_ICON, Search_Icon, LOCATION_ICON, SECONDARY_PROFILE_AVATAR } from "../res/drawables";

const BranchDropdown = ({ darkMode }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { branches, selectedBranch, setSelectedBranch } = useBranchStore();

  return (
    <View style={styles.branchContainer}>
      <TouchableOpacity
        style={[styles.branchButton, darkMode && styles.darkBranchButton]}
        onPress={() => setShowDropdown(true)}
      >
        <Text style={[styles.branchName, darkMode && styles.darkText]}>Branch</Text>
        <View style={styles.branchButtonContent}>
          <Image 
            source={LOCATION_ICON} 
            style={[styles.locationIcon, darkMode && styles.darkIcon]} 
          />
          <Text style={[styles.branchText, darkMode && styles.darkText]}>
            {selectedBranch?.location || "Select Branch"}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={showDropdown}
        onRequestClose={() => setShowDropdown(false)}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
          <View style={[styles.modalOverlay, darkMode && styles.darkOverlay]} />
        </TouchableWithoutFeedback>

        <View style={[styles.dropdownContainer, darkMode && styles.darkDropdownContainer]}>
          <FlatList
            data={branches}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  darkMode && styles.darkDropdownItem,
                  item._id === selectedBranch?._id && [
                    styles.selectedDropdownItem,
                    darkMode && styles.darkSelectedItem
                  ]
                ]}
                onPress={() => {
                  setSelectedBranch(item);
                  setShowDropdown(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    darkMode && styles.darkText,
                    item._id === selectedBranch?._id && styles.selectedDropdownText
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
  const { selectedBranch, setSelectedBranch, fetchBranches, branches } = useBranchStore();
  const { searchQuery, setSearchQuery } = useSearchStore();

  useEffect(() => {
    fetchBranches();
  }, []);

  const {
    user = {},
    Welcomermsg = "Welcome Back!",
    containerStyle = {},
    textContainer = {},
    showSearch = true,
    showBellIcon = true,
    navigation,
  } = props;

  const handleSearch = (query) => {
    setSearchQuery(query); 
  };

  return (
    <View style={[styles.mainContainer, darkMode && styles.darkMainContainer]}>
      <View style={[styles.container, containerStyle, darkMode && styles.darkContainer]}>
        <View style={styles.profileContainer}>
          <View style={styles.profileFirstContainer}>
            <Image 
              source={user?.image ? { uri: user.image } : SECONDARY_PROFILE_AVATAR} 
              style={[styles.image, darkMode && styles.darkImageBorder]} 
            />
            <BranchDropdown darkMode={darkMode} />
          </View>
          
          {showBellIcon && (
            <View style={styles.bellContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
                <Image 
                  source={NOTIFICATION_ICON} 
                  style={[styles.bellIcon, darkMode && styles.darkIcon]} 
                />
              </TouchableOpacity>
              <View style={styles.notificationBadge} />
            </View>
          )}
        </View>
        <View style={[styles.textContainer, textContainer]}>
          <Text style={[styles.welcomeText, darkMode && styles.darkText]}>
            Hi <Text style={[styles.usernameText, darkMode && styles.darkText]}>
              {user?.username}
            </Text>, {Welcomermsg}
          </Text>
        </View>

        {showSearch && (
          <View style={[styles.searchContainer, darkMode && styles.darkSearchContainer]}>
            <Image 
              source={Search_Icon} 
              style={[styles.searchIcon, darkMode && styles.darkSearchIcon]} 
            />
            <TextInput
              style={[styles.searchBar, darkMode && styles.darkSearchBar]}
              placeholder="Search Your Favourite Food Items"
              placeholderTextColor={darkMode ? '#aaa' : THEME_TEXT_COLOR}
              onChangeText={handleSearch}
              value={searchQuery}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Light mode styles
  mainContainer: {
    width: '100%'
  },
  container: {
    width: "100%",
    padding: 20,
    paddingBottom: 0,
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: Back_Ground
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  profileFirstContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: THEME_COLOR,
  },
  usernameText: {
    fontSize: 16,
    color: BLACK_COLOR,
  },
  textContainer: {
    width: '100%',
    marginVertical: 10,
    marginTop: 30,
    paddingLeft: 3
  },
  welcomeText: {
    fontSize: 14,
    color: BLACK_COLOR,
    textAlign: "flex-start",
  },
  bellContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellIcon: {
    width: 27,
    height: 27,
    tintColor: THEME_TEXT_COLOR
  },
  notificationBadge: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: THEME_COLOR,
    position: "absolute",
    right: 0,
    top: 0,
  },
  searchContainer: {
    width: "100%",
    backgroundColor: INPUT_BACK_COLOR,
    flexDirection: "row",
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 5,
    borderRadius: 5,
  },
  searchBar: {
    width: "100%",
    color: THEME_TEXT_COLOR,
  },
  searchIcon: {
    width: 25,
    height: 25,
    tintColor: THEME_COLOR,
  },
  branchContainer: {
    marginTop: 5,
    alignItems: "center",
    marginBottom: 5,
  },
  branchButton: {},
  branchText: {
    fontSize: 13,
    color: BLACK_COLOR,
  },
  dropdownContainer: {
    backgroundColor: WHITE_COLOR,
    width: "40%",
    position: "absolute",
    top: "7%",
    left: "19%",
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  selectedDropdownItem: {
    backgroundColor: THEME_TEXT_COLOR,
  },
  dropdownText: {
    fontSize: 12,
    color: BLACK_COLOR,
  },
  locationIcon: {
    width: 12,
    height: 12,
    resizeMode: "contain",
    tintColor: BLACK_COLOR,
  },
  branchName: {
    fontSize: 14,
    fontWeight: "500",
    color: THEME_COLOR,
  },
  branchButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  selectedDropdownText: {
    color: WHITE_COLOR,
  },
  modalOverlay: {
    flex: 1,
  },

  // Dark mode styles
  darkMainContainer: {
    backgroundColor: BLACK_COLOR,
  },
  darkContainer: {
    backgroundColor: BLACK_COLOR,
  },
  darkText: {
    color: WHITE_COLOR,
  },
  darkIcon: {
    tintColor: WHITE_COLOR,
  },
  darkImageBorder: {
    borderColor: THEME_COLOR,
  },
  darkSearchContainer: {
    backgroundColor: DARK_INPUT_BACK_COLOR || '#333',
  },
  darkSearchBar: {
    color: WHITE_COLOR,
    placeholderTextColor: '#aaa',
  },
  darkSearchIcon: {
    tintColor: WHITE_COLOR,
  },
  darkBranchButton: {
    backgroundColor: 'transparent',
  },
  darkDropdownContainer: {
    backgroundColor: '#222',
    borderColor: '#444',
  },
  darkDropdownItem: {
    borderBottomColor: '#444',
  },
  darkSelectedItem: {
    backgroundColor: THEME_TEXT_COLOR,
  },
});
export default Header;