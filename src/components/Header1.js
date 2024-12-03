import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { THEME_COLOR, WHITE_COLOR } from '../res/colors';
import { DISCOUNT_ICON, ARROW_ICON } from '../res/drawables';

const Header1 = ({ title = "Featured Discounts", arrowIcon = ARROW_ICON, discountIcon = DISCOUNT_ICON }) => {
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={arrowIcon} style={styles.ArrowIcon} />
                <View style={styles.DiscountContainer}>
                    <Image source={discountIcon} style={styles.DiscountIcon} />
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.HeaderText}>{title}</Text>
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
    ArrowIcon: {
        width: 40,
        height: 40,
    },
    textContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    HeaderText: {
        fontSize: 27,
        fontWeight: 'bold',
        color: WHITE_COLOR,
        textAlign: 'center',
    },
    DiscountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 80, 
    },
    DiscountIcon: {
        width: 40,
        height: 40,
    },
});

export default Header1;
