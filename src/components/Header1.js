import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { THEME_COLOR, WHITE_COLOR } from '../res/colors';
import { DISCOUNT_ICON, ARROW_ICON } from '../res/drawables';

const Header1 = ({
    title = "Featured Discounts",
    arrowIcon = ARROW_ICON,
    discountIcon = DISCOUNT_ICON,
    headerTextStyle = {},
    containerStyle = {},
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.profileContainer}>
                <Image source={arrowIcon} style={styles.arrowIcon} />
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
    );
};

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: '100%',
        padding: 30,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: THEME_COLOR,
        alignItems: 'center',
        shadowColor: '#000', 
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
