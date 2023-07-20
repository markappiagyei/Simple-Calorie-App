import React from "react";
import {ImageBackground, TouchableOpacity, View, StyleSheet, Text} from "react-native";


function LandingScreen({navigation}: { navigation: any }) {

    const handleGetStarted = () => {
        navigation.navigate('CalorieScreen');
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
});

export default LandingScreen;