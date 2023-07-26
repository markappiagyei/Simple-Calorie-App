import React, {useContext, useState} from "react";
import {TouchableOpacity, View, StyleSheet, Text } from "react-native";
import FoodContext from "../app/context/FoodContext";
import axios from "axios";




async function LandingScreen({navigation}: { navigation: any }) {
    const {user, setUser, setFoodEntries}: any  = useContext(FoodContext)// State to store the logged-in user

    // handles the access for regular users
    const handleGetStarted = async () => {
        setUser("Mark")
        navigation.navigate('MyDairyScreen');

    };

    // handles the access for admin users
    const handleAdminAccess = () =>{
        setUser("admin")
        console.log("User :" + user)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Simple Calorie App</Text>
            <TouchableOpacity style={styles.button} onPress={handleAdminAccess}>
                <Text style={styles.buttonText} >Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonToo} onPress={handleGetStarted} >
                <Text style={styles.buttonText} >User</Text>
            </TouchableOpacity>
        </View>

    );
}


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
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
        backgroundColor: 'green',
    },
    buttonToo: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: 'blue',
    },
    buttonText: {

        fontSize: 20,
        color: 'white',
    },
});

export default LandingScreen;