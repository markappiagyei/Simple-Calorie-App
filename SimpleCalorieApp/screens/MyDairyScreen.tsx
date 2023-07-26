import React, {useContext, useEffect, useState} from "react";
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from "react-native";
import FoodContext from "../app/context/FoodContext";
import axios from "axios";


function MyDairyScreen({navigation}: { navigation: any }) {
    // Get the foodEntries and setFoodEntries from the context
    const {foodEntries, setFoodEntries}: any = useContext(FoodContext);
    const [threshold, setThreshold] = useState<number>(2100);
    const [moneyThreshold, setmoneyThreshold] = useState<number>(1000);


// Function to fetch data from the server and update the state
    const fetchFoodEntries = async () => {
        try {
            // Fetch food entries from the backend API
            const apiUrl = 'http://10.0.2.2:8089/api/food';

            // Replace 'your-jwt-token' with the actual JWT token you have for authentication
            const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiSm9lIiwiaWF0IjoxNjkwMzg2MzQwLCJleHAiOjE2OTE1OTU5NDB9.btgimwFrxGWPEY4C9g-ymyZiakfa0-t9S4R-94D6T_0';

            axios.get(apiUrl, {
                headers: {
                    Authorization: jwtToken,
                },
            })
                .then((response) => {
                    // Assuming the backend API returns an array of IFoodEntry objects
                    setFoodEntries(response.data);
                })
                .catch((error) => {
                    // Handle any error that might occur during the API call
                    console.error('Error fetching food entries:', error);
                    console.log(error.status)
                });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    // Calculate the totalCalories using reduce
    const totalCalories = foodEntries.reduce(
        (total: number, entry: { calorieValue: string }) => total + parseInt(entry.calorieValue, 10), 0
    );

    // Calculate the Spent using reduce
    const totalSpent = foodEntries.reduce(
        (total: number, entry: { price: string }) => total + parseFloat(entry.price),
        0
    );

    console.log(new Date().toLocaleString());



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
                    )}/>

                <View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CalorieScreen")}>
                        <Text style={styles.buttonText}>Add food</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerToo}>
                    {totalCalories < threshold ?
                        (<Text style={styles.contextText}>Daily calories</Text>) : (
                        <Text style={styles.warningText}>
                            Warning!!! {"\n"}
                            Your calorie Threshold of {threshold} has been reached!
                        </Text>)}

                    {totalSpent < moneyThreshold ? (<Text style={styles.contextText}>
                        Total spent this month: € {totalSpent.toFixed(2)}</Text>) : (
                        <Text style={styles.warningText}>
                            Warning!!! {"\n"}
                            You've spent more than € {moneyThreshold.toFixed(2)} in a month
                        </Text>)}
                    <Text style={styles.conText}>Total Calories: {totalCalories}</Text>
                    <Text>{foodEntries?.dateEaten?.toLocaleString()}</Text>
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
        width: "100%",
    },
    foodName: {
        flex: 1,
        fontSize: 18,
        color: "black",
        textAlign: "left",
    },
    calorieAmount: {
        fontSize: 18,
        color: "black",
        textAlign: "center",
        width: 100,
    },
    price: {
        fontSize: 18,
        color: "black",
        textAlign: "right",
        width: 80,
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
