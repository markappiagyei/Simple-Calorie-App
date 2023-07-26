import React, {createContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from './screens/LandingScreen';
import CalorieScreen from './screens/CalorieScreen';
import MyDairyScreen from './screens/MyDairyScreen';
import {appId, baseUrl} from './atlasconfig.json';

import {
    AppProvider,
} from '@realm/react';
import {FoodProvider} from "./app/context/FoodContext";
import AdminReportScreen from "./screens/AdminReportScreen";

const Stack = createStackNavigator();

// The stack of the screens
function MyStack() {
    return (
        <Stack.Navigator initialRouteName="LandingScreen">
            <Stack.Screen name="LandingScreen" component={LandingScreen}/>
            <Stack.Screen name="MyDairyScreen" component={MyDairyScreen}/>
            <Stack.Screen name="CalorieScreen" component={CalorieScreen}/>
            <Stack.Screen name="AdminReportScreen" component={AdminReportScreen}/>
        </Stack.Navigator>
    );
}

// The main App component
export default function App() {
    return (
        <AppProvider id={appId} baseUrl={baseUrl}>
                    <FoodProvider>
                        <NavigationContainer>
                            <MyStack/>
                        </NavigationContainer>
                    </FoodProvider>
        </AppProvider>
    );
}
