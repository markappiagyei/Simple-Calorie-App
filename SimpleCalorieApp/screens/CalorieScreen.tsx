import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import FoodContext from "../app/context/FoodContext";
import uuid from 'react-native-uuid';
import { FoodEntry } from "../app/realm/FoodEntry";
import axios from "axios";

function CalorieScreen({ navigation }: { navigation: any }) {
    const { foodEntries, setFoodEntries }: any = useContext(FoodContext);
    const [id, setID] = useState('')
    const [foodName, setFoodName] = useState('Hamburger');
    const [calorieValue, setCalorieValue] = useState('222');
    const [price, setPrice] = useState('4.45');

    // State to track whether the user attempted to submit the form
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSaveFoodEntry = async () => {
        // Validation: Check if any of the fields are empty
        if (!foodName || !calorieValue || !price) {
            setFormSubmitted(true);
            Alert.alert('Please fill in all fields.');
            return;
        }

        // Validation: Check if calorieValue and price are valid numeric values
        if (isNaN(Number(calorieValue)) || isNaN(Number(price))) {
            setFormSubmitted(true);
            Alert.alert('Calorie value and price must be valid numeric values.');
            return;
        }

        // Initialize new food Entry
        const newFoodEntry: FoodEntry = {
            _id: '',
            username: 'Mark',
            foodName: foodName,
            calorieValue: calorieValue,
            price: price,
            dateEaten: new Date(),
        };

        try {

            const apiUrl = 'http://10.0.2.2:8089/api/create';

            const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsIm5hbWUiOiJNYXJrIiwiaWF0IjoxNjkwMzg2MzEzLCJleHAiOjE2OTE1OTU5MTN9.tIWCbS0cRVNZxv8vddap0ZaFJ_oeDfq3gyELNsW5B7k';

            // Make the POST request with the newFoodEntry data and Authorization header
            const response = await axios.post(apiUrl, newFoodEntry, {
                headers: {
                    Authorization: jwtToken,
                },
            });
            console.log('New Food Entry Created:', response.data);
            navigation.navigate("MyDairyScreen")
        } catch (error) {
            console.error('Error creating food entry:', error);
        }
    };

    console.log(foodEntries)



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Food entry</Text>
            <TextInput
                style={[styles.input, formSubmitted && !foodName && styles.inputError]}
                onChangeText={setFoodName}
                value={foodName}
                placeholder="Food/product name"
            />
            <TextInput
                style={[styles.input, formSubmitted && !calorieValue && styles.inputError]}
                onChangeText={setCalorieValue}
                value={calorieValue}
                placeholder="Calorie value"
            />

            <TextInput
                style={[styles.input, formSubmitted && !price && styles.inputError]}
                onChangeText={setPrice}
                value={price}
                placeholder="Price"
            />
            <TouchableOpacity style={styles.button} onPress={handleSaveFoodEntry}>
                <Text style={styles.buttonText}>Save Entry</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    button: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: '#3498db',
    },
    buttonText: {
        fontSize: 20,
        color: 'black',
    },
    input: {
        backgroundColor: 'white',
        width: 250,
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    datePickerButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: '#f39c12',
    },
});

export default CalorieScreen;
