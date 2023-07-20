import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from "./screens/LandingScreen";
import CalorieScreen from "./screens/CalorieScreen";


const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName={"LandingScreen"}>
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
            <Stack.Screen name="CalorieScreen" component={CalorieScreen} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}