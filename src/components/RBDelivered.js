import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { GRAY_COLOR, WHITE_COLOR, THEME_COLOR, THEME_TEXT_COLOR, Back_Ground } from "../res/colors";
import CustomButtom from "./CustomButtom";

const RBDelivered = ({ sheetRef, selectedOrder }) => {
    const [rating, setRating] = useState(0);

    return (
        <RBSheet
            ref={sheetRef}
            height={450}
            draggable={true}
            customStyles={{
                container: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: WHITE_COLOR,
                },
                wrapper: {
                    backgroundColor: "transparent",
                },
                draggableIcon: {
                    backgroundColor: GRAY_COLOR,
                },
            }}
            animationType="slide"
        >
            {selectedOrder && (
                <ScrollView style={styles.sheetContent}>
                    <View style={styles.orderDetails}>
                        <Text style={styles.orderIdText}>{selectedOrder.orderId}</Text>
                        <Text style={styles.sheetLabel}>Delivered By: <Text style={styles.deliveredByValue}>{selectedOrder.deliveredBy}</Text></Text>
                        <Text style={styles.sheetValue}>Order Details: <Text style={styles.deliveredByValue}>{selectedOrder.orderDetails}</Text></Text>
                        <Text style={styles.sheetLabel}>Delivered On: <Text style={styles.deliveredByValue}>{selectedOrder.deliveredOn}</Text></Text>
                    </View>
                    <Text style={styles.orderIdText}>Rate Our Service</Text>
                    <View style={styles.ratingContainer}>
                        <View style={styles.stars}>
                            {[...Array(5)].map((_, i) => (
                                <Pressable key={i} onPress={() => setRating(i + 1)}>
                                    <Text style={i < rating ? styles.starFilled : styles.starEmpty}>★</Text>
                                </Pressable>
                            ))}
                        </View>
                        <TouchableOpacity style={styles.submitButton} onPress={() => console.log("Rating Submitted:", rating)}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ButtonsContainer} >
                    <View style={styles.buttonContainer}>
                        <CustomButtom
                            title={"Re-Order"}
                            width={'100%'}
                            height={48}
                            backgroundColor={Back_Ground}
                            borderColor={THEME_COLOR}
                            textStyle={{ color: WHITE_COLOR}} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <CustomButtom title={"Go Back"} width={'100%'} height={48}
                            backgroundColor={THEME_COLOR}
                            borderColor={THEME_COLOR}
                            textStyle={{ color: WHITE_COLOR }}/>
                    </View>
                    </View>
                </ScrollView>
            )}
        </RBSheet>
    );
};

const styles = StyleSheet.create({
    sheetLabel: {
        fontSize: 14,
        color: THEME_COLOR,
        marginBottom: 8,
        fontWeight: "700",
    },
    deliveredByValue: {
        fontSize: 14,
        color: THEME_TEXT_COLOR,
        marginBottom: 8,
        fontWeight: '400'
    },
    sheetValue: {
        fontSize: 14,
        marginBottom: 8,
        color: THEME_COLOR,
        fontWeight: "bold",
    },
    sheetContent: {
        flex: 1,
        paddingHorizontal: 16,
        // paddingTop: 16,
    },
    orderDetails: {
        marginVertical: 5,
    },
    orderIdText: {
        fontSize: 18,
        color: THEME_TEXT_COLOR,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },
    ratingContainer: {
        backgroundColor: Back_Ground,
        borderRadius: 37,
        height: 48,
        width: '100%',
        alignItems: "center",
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginVertical:25
    },
    stars: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 8,
    },
    starFilled: {
        fontSize: 20,
        color: THEME_COLOR,
        marginHorizontal: 4,
    },
    starEmpty: {
        fontSize: 20,
        color: GRAY_COLOR,
        marginHorizontal: 4,
    },
    submitButton: {
        backgroundColor: THEME_TEXT_COLOR,
        height: 30,
        width: 100,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    submitButtonText: {
        color: WHITE_COLOR,
        fontWeight: "bold",
        lineHeight: 30,
        fontSize: 15,
        textAlign: "center",
    },
    buttonContainer: {
        alignItems: "center",
    },
    ButtonsContainer:{
        justifyContent:'flex-end'
        
    }
});

export default RBDelivered;
