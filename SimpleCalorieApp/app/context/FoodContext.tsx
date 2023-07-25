// FoodContext.js
import React, { createContext, useEffect, useState } from 'react';
import Realm from 'realm';
import appId from '../../atlasconfig.json';
import { FoodEntry } from '../../models/FoodEntySchema';
import {useUser} from "@realm/react";

const FoodContext = createContext({});

export const FoodProvider = ({ children }: any) => {
    const [foodEntries, setFoodEntries] = useState<Realm.Results<FoodEntry & Realm.Object> | null>(null);
    const [user, setUser] = useState<any>(null); // State to store the logged-in user
    const [loading, setLoading] = useState(true); // State to manage the loading state

    useEffect(() => {
        // ... Your loginWithToken function ...
        // Implement the login process using Custom JWT User authentication
        const loginWithToken = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJkYXRhLW5wZmp0IiwiZXhwIjoxODkzNDU5NzU1LCJpYXQiOjE2NzI1MzQ5NTUsIm5hbWUiOiJNYXJrIiwic3ViIjoiTWFyayBBcHBpYWd5ZWkifQ.sN4O983IlJgSPgnttriDrsHhJkiI5P-Io45yJndFyvw';
                const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJkYXRhLW5wZmp0IiwiZXhwIjoxODkzNDU5NzU1LCJpYXQiOjE2NzI1MzQ5NTUsIm5hbWUiOiJBZG1pbiIsInN1YiI6IkFkbWluIn0.53aoUVHD8BY1fp3TJQO6VTXOeW07GGKLNnOYFyezty8';
                console.log(adminToken)
                // Create a custom jwt credential with the token
                const credentials = Realm.Credentials.jwt(token);


                // Log in with the custom jwt credentials
                const app = new Realm.App({ id: appId.appId });
                const userCredentials = await app.logIn(credentials);
                const user = userCredentials.identities;
                console.log(user)
                // Set the logged-in user in the state
                setUser(user);

                console.log(user)

            } catch (error) {
                console.error('Error logging in:', error);
            } finally {
                // Set loading to false when login process completes
                setLoading(false);
            }
        };

        // Load initial data from Realm
        const loadFoodEntries = async () => {
            try {
                const realm = await Realm.open({ schema: [FoodEntry] });
                const entries = realm.objects<FoodEntry>('FoodEntry');
                setFoodEntries(entries);
                console.log("Food entries are: " + entries)
            } catch (error) {
                console.error('Error loading food entries:', error);
            } finally {
                setLoading(false);
            }
        };

        loginWithToken();
        loadFoodEntries();
    }, []);

    // CRUD Operations
    const addFoodEntry = async (newEntry: FoodEntry) => {
        try {
            const realm = await Realm.open({ schema: [FoodEntry] });
            realm.write(() => {
                realm.create('FoodEntry', newEntry);
            });
            setFoodEntries(realm.objects<FoodEntry>('FoodEntry'));
        } catch (error) {
            console.error('Error adding food entry:', error);
        }
    };

    const updateFoodEntry = async (updatedEntry: FoodEntry) => {
        try {
            const realm = await Realm.open({ schema: [FoodEntry] });
            realm.write(() => {
                realm.create('FoodEntry', updatedEntry, Realm.UpdateMode.Modified);
            });
            setFoodEntries(realm.objects<FoodEntry>('FoodEntry'));
        } catch (error) {
            console.error('Error updating food entry:', error);
        }
    };

    const deleteFoodEntry = async (entryId: string) => {
        try {
            const realm = await Realm.open({ schema: [FoodEntry] });
            realm.write(() => {
                const entryToDelete = realm.objectForPrimaryKey('FoodEntry', entryId);
                if (entryToDelete) {
                    realm.delete(entryToDelete);
                }
            });
            setFoodEntries(realm.objects<FoodEntry>('FoodEntry'));
        } catch (error) {
            console.error('Error deleting food entry:', error);
        }
    };

    return (
        <FoodContext.Provider
            value={{ foodEntries, setFoodEntries, user, loading, addFoodEntry, updateFoodEntry, deleteFoodEntry }}
        >
            {children}
        </FoodContext.Provider>
    );
};

export default FoodContext;
