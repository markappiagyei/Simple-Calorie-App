import React from "react";
import {ImageBackground, TouchableOpacity, View, StyleSheet, Text, Button} from "react-native";
import {useApp} from "@realm/react";
import Realm from "realm";


function LandingScreen({navigation}: { navigation: any }) {

    const handleGetStarted = () => {
        navigation.navigate('MyDairyScreen');
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Simple Calorie App</Text>
            <TouchableOpacity
                style={styles.button}
            >
                <Text style={styles.buttonText} onPress={handleGetStarted}>Get Started</Text>
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
    buttonText: {

        fontSize: 20,
        color: 'white',
    },
});

export default LandingScreen;