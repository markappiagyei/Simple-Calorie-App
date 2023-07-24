// FoodContext.js
import React, {createContext, useEffect, useState} from 'react';
import Realm from 'realm';
import appId from '../../atlasconfig.json'
import {FoodEntry} from "../../models/FoodEntySchema";
import * as realm from "realm";
import {UserProvider, useUser} from "@realm/react";

const FoodContext = createContext({});

export const FoodProvider =  ({children}: any) => {
    const [foodEntries, setFoodEntries] = useState([]);
    const [user, setUser] = useState <any>(null); // State to store the logged-in user
    const [loading, setLoading] = useState(true); // State to manage the loading state

    useEffect(() => {
        // Implement the login process using Custom JWT User authentication
        const loginWithToken = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJkYXRhLW5wZmp0IiwiZXhwIjoxODkzNDU5NzU1LCJpYXQiOjE2NzI1MzQ5NTUsIm5hbWUiOiJNYXJrIiwic3ViIjoiTWFyayBBcHBpYWd5ZWkifQ.sN4O983IlJgSPgnttriDrsHhJkiI5P-Io45yJndFyvw';
                console.log(token)
                // Create a custom jwt credential with the token
                const credentials = Realm.Credentials.jwt(token);


                // Log in with the custom jwt credentials
                const app = new Realm.App({id: appId.appId}); // Replace with your Realm app id
                const user = await app.logIn(credentials);
                console.log(user)
                // Set the logged-in user in the state
                setUser(useUser);

                console.log(user)

            } catch (error) {
                console.error('Error logging in:', error);
            } finally {
                // Set loading to false when login process completes
                setLoading(false);
            }
        };

        loginWithToken();
    }, []);


    return (

        <FoodContext.Provider value={{foodEntries, setFoodEntries, user, loading}}>
            {children}
        </FoodContext.Provider>
    );
};

export default FoodContext;
