import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { THEME_COLOR, WHITE_COLOR } from '../res/colors';
import { DISCOUNT_ICON, ARROW_ICON } from '../res/drawables';

const Header1 = ({
    title = "Featured Discounts",
    arrowIcon = ARROW_ICON,
    discountIcon = DISCOUNT_ICON,
    headerTextStyle = {},
    containerStyle = {},
}) => {
    const navigation = useNavigation();
    return (
        <View style = {[styles.maincontainer]}>
        <View style={[styles.container, containerStyle]}>
            <View style={styles.profileContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                        {/* Wrap arrowIcon with TouchableOpacity */}
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
    maincontainer:{
        width: '100%',
        backgroundColor:WHITE_COLOR
    },
    container: {
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        padding : 30,
        marginTop : 30,
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
