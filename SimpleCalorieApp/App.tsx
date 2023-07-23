import React, {createContext, useState} from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './screens/LandingScreen';
import CalorieScreen from './screens/CalorieScreen';
import MyDairyScreen from './screens/MyDairyScreen';
import { appId, baseUrl } from './atlasconfig.json';
import Realm from 'realm';

import {
    AppProvider,
    createRealmContext,
    RealmProvider,
    useApp,
    UserProvider,
} from '@realm/react';
import {FoodEntry} from "./models/FoodEntry";
import {FoodProvider} from "./FoodContext";

const Stack = createStackNavigator();






function MyStack() {
    return (
        <Stack.Navigator initialRouteName="LandingScreen">
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
            <Stack.Screen name="MyDairyScreen" component={MyDairyScreen} />
            <Stack.Screen name="CalorieScreen" component={CalorieScreen} />
        </Stack.Navigator>
    );
}


export default function App() {
    return (
        <FoodProvider>
        <AppProvider id={appId} baseUrl={baseUrl}>
                <NavigationContainer>
                    <MyStack />
                </NavigationContainer>
        </AppProvider>
        </FoodProvider>
    );
}
