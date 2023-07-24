import React, {useContext, useEffect, useState} from "react";
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from "react-native";
import FoodContext from "../app/context/FoodContext";


function MyDairyScreen({navigation}: { navigation: any }) {
    // Get the foodEntries and setFoodEntries from the context
    // @ts-ignore
    const {foodEntries} = useContext(FoodContext);
    const [threshold, setThreshold] = useState<number>(2100);

    // Calculate the totalCalories using reduce
    const totalCalories = foodEntries.reduce(
        (total: number, entry: { calorieValue: string }) => total + parseInt(entry.calorieValue, 10), 0
    );

    // Get the date of the last item in the list
    const lastDateEaten = foodEntries.length > 0 ? foodEntries[foodEntries.length - 1].dateEaten : null;


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
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CalorieScreen")}>
                        <Text style={styles.buttonText}>Add food</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerToo}>

                    {totalCalories < threshold ? (<Text style={styles.contextText}>Daily calories</Text>) : (
                        <Text style={styles.warningText}>
                            Warning!!! {"\n"}
                            Your calorie Threshold of {threshold} has been reached!
                        </Text>)}
                    <Text style={styles.conText}>Total Calories: {totalCalories}</Text>
                    {lastDateEaten && <Text style={styles.conText}>
                        {lastDateEaten.toDateString()}
                    </Text>}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 10,
    },
    title: {
        fontSize: 30,
        textAlign: "left",
        fontWeight: "bold",
        color: "black",
        marginBottom: 20,
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
        marginTop: 40,
    },
    conText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        marginBottom: 5,
        marginTop: 10,
    },
    button: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: "green",
    },
    buttonText: {
        fontSize: 20,
        color: "white",
        textAlign: "center",
    },
    contextText: {
        fontSize: 20,
        color: 'black',
        textAlign: "center"
    },
    warningText: {
        fontSize: 20,
        color: 'red',
        textAlign: "center"
    }
});

export default MyDairyScreen;
