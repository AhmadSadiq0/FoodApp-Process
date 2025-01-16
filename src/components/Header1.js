import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
//Colors
import { Back_Ground, THEME_COLOR, WHITE_COLOR, BLACK_COLOR } from '../res/colors';
//Icon
import { DISCOUNT_ICON, ARROW_ICON } from '../res/drawables';
//navigation
import { useNavigation } from '@react-navigation/native';

const Header1 = (props) => {
    const {
        title = "Featured Discounts",
        arrowIcon = ARROW_ICON,
        discountIcon = DISCOUNT_ICON,
        headerTextStyle = {},
        containerStyle = {},
    } = props;
    const navigation = useNavigation();

    return (
        <View style={[styles.maincontainer]}>
            <View style={[styles.container, containerStyle]}>
                <View style={styles.profileContainer}>
                    {/* Make the arrow icon clickable to go back */}
                    <TouchableOpacity  onPress={() => navigation.goBack()}>
                        <Image source={arrowIcon} style={styles.arrowIcon} />
                    </TouchableOpacity>
                    {discountIcon && (
                        <View style={styles.discountContainer}>
                            <Image source={discountIcon} style={styles.discountIcon} />
                        </View>
                    )}
                </View>

                <View style={styles.textContainer}>
                    <Text style={[styles.headerText, headerTextStyle]}>{title}</Text>
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
        height: 150,
        width: '100%',
        padding: 30,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: THEME_COLOR,
        alignItems: 'center',
        shadowColor: BLACK_COLOR,
        shadowOffset: { width: 0, height: 30 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    arrowIcon: {
        width: 40,
        height: 40,
    },
    textContainer: {
        alignItems: 'center',
        marginVertical: 10,
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
