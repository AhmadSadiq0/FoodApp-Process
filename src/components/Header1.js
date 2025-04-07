import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
// Colors
import { Back_Ground, THEME_COLOR, WHITE_COLOR, BLACK_COLOR } from '../res/colors';
// Icon
import { DISCOUNT_ICON, ARROW_ICON } from '../res/drawables';
// navigation
import { useNavigation } from '@react-navigation/native';
import useThemeStore from '../../zustand/ThemeStore';

const Header1 = (props) => {
    const { darkMode } = useThemeStore();
    const {
        title = "Featured Discounts",
        arrowIcon = ARROW_ICON,
        discountIcon = DISCOUNT_ICON,
        headerTextStyle = {},
        containerStyle = {},
    } = props;
    const navigation = useNavigation();

    return (
        <View style={[styles.maincontainer, darkMode && { backgroundColor: BLACK_COLOR }]}>
            <View style={[
                styles.container, 
                containerStyle,
                darkMode && { backgroundColor: BLACK_COLOR }
            ]}>
                <View style={styles.profileContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image 
                            source={arrowIcon} 
                            style={[
                                styles.arrowIcon, 
                                darkMode && { tintColor: WHITE_COLOR }
                            ]} 
                        />
                    </TouchableOpacity>
                    {discountIcon && (
                        <View style={styles.discountContainer}>
                            <Image 
                                source={discountIcon} 
                                style={[
                                    styles.discountIcon,
                                    darkMode && { tintColor: WHITE_COLOR }
                                ]} 
                            />
                        </View>
                    )}
                </View>
                
                <View style={styles.textContainer}>
                    <Text style={[
                        styles.headerText, 
                        headerTextStyle,
                        darkMode && { color: WHITE_COLOR }
                    ]}>
                        {title}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    maincontainer: {
        backgroundColor: Back_Ground
    },
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
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    arrowIcon: {
        width: 40,
        height: 40,
    },
    textContainer: {
        paddingTop: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 27,
        fontWeight: 'bold',
        color: WHITE_COLOR,
        textAlign: 'center',
    },
    discountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 80,
    },
    discountIcon: {
        width: 40,
        height: 40,
    },
});

export default Header1;