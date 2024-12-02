import React from 'react';
import { StyleSheet, View, Image, Text, TextInput } from 'react-native';
import { THEME_COLOR, WHITE_COLOR, Green_Color, THEME_TEXT_COLOR } from '../res/colors';
import { Profie_Image } from '../res/drawables';
import { Bell_ICON, Search_Icon } from '../res/drawables';

const SearchBar = ({ placeholder }) => (
    <View style={styles.searchContainer}>
        <TextInput
            style={styles.searchBar}
            placeholder={placeholder}
            placeholderTextColor={THEME_TEXT_COLOR}
        />
        <Image
            source={Search_Icon}
            style={styles.searchIcon}
        />
    </View>
);

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={Profie_Image} style={styles.image} />
                <Text style={styles.usernameText}>Huzaifa Saddique</Text> 
                <View style={styles.bellContainer}>
                    <Image source={Bell_ICON} style={styles.bellIcon} />
                    <View style={styles.notificationBadge} />
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome to</Text>
                <Text style={styles.kitchenText}>Ahmad Kitchen</Text>
            </View>
            <SearchBar placeholder="Search Your Favourite Food Item" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '100%',
        padding: 30,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: THEME_COLOR,
        alignItems: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
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
        fontWeight: 'bold',
        color: WHITE_COLOR,
        marginRight: 50,
    },
    searchBar: {
        height: 65,
        backgroundColor: WHITE_COLOR,
        borderRadius: 50,
        paddingLeft: 50,
        width: '100%',
        marginTop: 30,
        color: THEME_TEXT_COLOR,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 20,
    },
    textContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    welcomeText: {
        fontSize: 16,
        color: WHITE_COLOR,
        textAlign: 'center',
    },
    kitchenText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: WHITE_COLOR,
        textAlign: 'center',
        fontFamily: 'Ribeye',
    },
    bellContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        position: 'absolute',
        right: 0,
        top: 0,
    },
    searchContainer: {
        width: '100%',
        marginTop: -30,
        position: 'relative',
    },
    searchIcon: {
        position: 'absolute',
        left: 20,
        top: 50,
        width: 25,
        height: 25,
    },
});

export default Header;
