import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import uuid from 'react-native-uuid';
import {FoodEntry} from "../models/FoodEntry";

function CalorieScreen({navigation}: { navigation: any }) {
    const [foodEaten, setEatenFood] = useState<FoodEntry[]>([]);
    const [foodName, setFoodName] = useState('');
    const [calorieValue, setCalorieValue] = useState('');


    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const handleSaveFoodEntry = () => {
        const newFoodEntry: FoodEntry = {
            id: uuid.v5.toString(),
            foodName: foodName,
            calorieValue: calorieValue,
            date: new Date(),
        };

        setEatenFood([...foodEaten, newFoodEntry]);
        console.log(foodEaten)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Food entry</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFoodName}
                value={foodName}
                placeholder="Food/product name"
            />
            <TextInput
                style={styles.input}
                onChangeText={setCalorieValue}
                value={calorieValue}
                placeholder="Calorie value"
            />

            <Button title="Open" onPress={() => setOpen(true)}/>

            <TouchableOpacity style={styles.button} onPress={handleSaveFoodEntry}>
                <Text style={styles.buttonText}>Save Entry</Text>
            </TouchableOpacity>
        </View>
    );
}




    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'red',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            fontSize: 30,
            fontWeight: 'bold',
            color: 'white',
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
            color: 'white',
        },
        input: {
            backgroundColor: 'white',
            width: 250,
            padding: 10,
            borderRadius: 8,
            marginBottom: 10,
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
