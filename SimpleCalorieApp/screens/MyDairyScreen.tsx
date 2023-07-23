import React, {useContext, useEffect, useState} from "react";
import {ImageBackground, TouchableOpacity, View, StyleSheet, Text, FlatList, Button} from "react-native";
import {FoodEntry} from "../models/FoodEntry";
import {it} from "@jest/globals";
import {FoodContext} from "../FoodContext";



function MyDairyScreen({navigation}: { navigation: any }) {
    // @ts-ignore
    const { foodEntries, setFoodEntries } = useContext(FoodContext);

    // Move the setEatenFood inside a useEffect hook and update the dependency to foodEntries
    useEffect(() => {
        setFoodEntries([...foodEntries]);
    }, [foodEntries]);


    const totalCalories = foodEntries.reduce(
        (total: number, entry: { calorieValue: string; }) => total + parseInt(entry.calorieValue), 0);

    // Get the date of the last item in the list
    const lastDateEaten = foodEntries.length > 0 ?
        foodEntries[foodEntries.length - 1].dateEaten : null;


    return (
        <View style={styles.container}>
            <Text style={styles.title}> My Dairy</Text>
            <View style={styles.container}>
                <FlatList
                    data={foodEntries}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <View style={styles.foodEntry}>
                            <Text style={styles.foodName}>{item.foodName}</Text>
                            <Text style={styles.price}>{item.price} euro</Text>
                            <Text style={styles.calorieAmount}>{item.calorieValue} cal</Text>
                        </View>
                    )}
                />

                <View>
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText} onPress={() => navigation.navigate("CalorieScreen")}>
                            Add food
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerToo}>
                    <Text style={styles.conText}>Total Calories: {totalCalories}</Text>
                    {lastDateEaten && (
                        <Text style={styles.conText}> {lastDateEaten.toDateString()}</Text>
                    )}
                </View>


            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 10
    },
    title: {
        fontSize: 30,
        textAlign: "left",
        fontWeight: "bold",
        color: "black",
        marginBottom: 20,
    },
    foodListContainer: {
        flex: 1,
        width: "100%",
    },
    foodEntry: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 30,
        padding: 10,
        width: "100%", // Make the foodEntry container fill the horizontal width
    },
    foodName: {
        flex: 1, // Make the text element take up the available space in the row
        fontSize: 18,
        color: "black",
        textAlign: "left", // Align the text to the left
    },
    calorieAmount: {
        fontSize: 18,
        color: "black",
        textAlign: "center", // Align the text to the center
        width: 100, // Set a fixed width for the calorie amount
    },
    price: {
        fontSize: 18,
        color: "black",
        textAlign: "right", // Align the text to the right
        width: 80, // Set a fixed width for the price
    },

    containerToo: {
        marginBottom: 60,
        marginTop: 40
    },
    conText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        marginBottom: 5

    },
    button: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: 'green',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
});

export default MyDairyScreen;