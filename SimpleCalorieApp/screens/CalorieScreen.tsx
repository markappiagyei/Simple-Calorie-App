import {Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, { useContext, useState } from "react";
import uuid from 'react-native-uuid';
import {FoodEntry} from "../models/FoodEntySchema";
import FoodContext  from "../app/context/FoodContext";
import realm from "realm";
import {useRealm} from "@realm/react";

function CalorieScreen({ navigation }: { navigation: any }) {
    // @ts-ignore
    const { foodEntries, setFoodEntries } = useContext(FoodContext);
    const [foodName, setFoodName] = useState('');
    const [calorieValue, setCalorieValue] = useState('');
    const [price, setPrice] = useState('');

    const realm = useRealm();

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    // State to track whether the user attempted to submit the form
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSaveFoodEntry = () => {
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

        const newFoodEntry: FoodEntry = {

        };


        setFoodEntries([...foodEntries, newFoodEntry]);
        console.log(foodEntries)

        navigation.navigate("MyDairyScreen")
    };

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
            <Button title="Open" onPress={() => setOpen(true)} />
            <TouchableOpacity style={styles.button} onPress={handleSaveFoodEntry}>
                <Text style={styles.buttonText}>Save Entry</Text>
            </TouchableOpacity>
        </View>
    );
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
        borderColor: 'red', // Add a red border color when the input is empty
        borderWidth: 1,
    },
    datePickerButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: '#f39c12', // Change color to your preference
    },
});

export default CalorieScreen;
