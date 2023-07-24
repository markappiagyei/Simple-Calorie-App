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
import {FoodProvider} from "./app/context/FoodContext";

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

        <AppProvider id={appId} baseUrl={baseUrl}>
            <UserProvider>
                <NavigationContainer>
                    <FoodProvider>
                    <MyStack />
                    </FoodProvider>
                </NavigationContainer>
        </UserProvider>
        </AppProvider>

    );
}
