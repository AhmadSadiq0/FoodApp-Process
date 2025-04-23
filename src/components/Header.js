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
  THEME_TEXT_COLOR,
  Back_Ground,
  BLACK_COLOR,
  INPUT_BACK_COLOR,
} from "../res/colors";
import useSearchStore from "../store/SearchStore";
import useBranchStore from "../store/BranchStore";
import useThemeStore from "../../zustand/ThemeStore";

// Importing Icons
import { NOTIFICATION_ICON, Search_Icon, LOCATION_ICON, SECONDARY_PROFILE_AVATAR } from "../res/drawables";

const BranchDropdown = ({ darkMode }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { branches, selectedBranch, setSelectedBranch } = useBranchStore();

  return (
    <View style={styles.branchContainer}>
      <TouchableOpacity
        style={[styles.branchButton, darkMode && { backgroundColor: BLACK_COLOR }]}
        onPress={() => setShowDropdown(true)}
      >
        <Text style = {styles.branchName}>Branch</Text>
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
    <View style={[styles.mainContainer, darkMode && { backgroundColor: BLACK_COLOR }]}>
      <View
        style={[
          styles.container,
          containerStyle,
          darkMode && { backgroundColor: BLACK_COLOR }
        ]}
      >
        <View style={styles.profileContainer}>
          <View style = {styles.profileFirstContainer}>
          <Image source={user && user.image ? { uri: user.image } : SECONDARY_PROFILE_AVATAR} style={styles.image} />
          <BranchDropdown
            selectedBranch={selectedBranch}
            onSelectBranch={setSelectedBranch}
            branches={branches}
            darkMode={darkMode}
          />
          </View>
          
          {showBellIcon && (
            <View style={styles.bellContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
                <Image 
                  source={NOTIFICATION_ICON} 
                  style={[styles.bellIcon, darkMode && { tintColor: WHITE_COLOR }]} 
                />
              </TouchableOpacity>
              <View style={styles.notificationBadge} />
            </View>
          )}
        </View>
        <View style={[styles.textContainer, textContainer]}>
          <Text style={[styles.welcomeText, darkMode && { color: WHITE_COLOR }]}>
            Hi <Text
            style={[
              styles.usernameText,
              darkMode && { color: WHITE_COLOR }
            ]}
          >
            {user && user.username}
          </Text> , {Welcomermsg}
          </Text>
        </View>

        {showSearch && (
          <View style={styles.searchContainer}>
            <Image 
              source={Search_Icon} 
              style={[styles.searchIcon, darkMode && { tintColor: WHITE_COLOR }]} 
            />
            <TextInput
              style={[
                styles.searchBar,
                darkMode && { 
                  backgroundColor: '#333',
                  color: WHITE_COLOR,
                  placeholderTextColor: '#aaa'
                }
              ]}
              placeholder="Search Your Favourite Food Items"
              placeholderTextColor={darkMode ? '#aaa' : THEME_TEXT_COLOR}
              onChangeText={handleSearch}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width : '100%'
  },
  container: {
    width: "100%",
    padding: 20,
    paddingBottom : 0,
    alignItems: "center",
    paddingTop : 40,
    backgroundColor : Back_Ground
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
    gap : 10
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
    fontStyle : "italic"
  },
  textContainer: {
    width : '100%',
    marginVertical: 10,
    marginTop : 30,
    paddingLeft : 3
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
    tintColor : THEME_TEXT_COLOR
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
    flexDirection : "row",
    alignItems : 'center',
    paddingVertical : 10,
    paddingHorizontal : 10,
    gap : 5,
    borderRadius : 5,
  },
  searchBar: {
    width: "100%",
    color: THEME_TEXT_COLOR,
  },
  searchIcon: {
    width: 25,
    height: 25,
    tintColor : THEME_COLOR,
  },
  branchContainer: {
    marginTop: 5,
    alignItems: "center",
    marginBottom: 5,
  },
  branchButton: {
   
  },
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
      borderWidth : 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: 'row', 
    alignItems: 'center',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
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
  branchName : {
    fontSize: 14,
    fontWeight : "500",
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
});

export default Header;