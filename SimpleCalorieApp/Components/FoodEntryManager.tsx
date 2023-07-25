
import React, { createContext, useContext, useEffect, useState } from 'react';
import Realm from 'realm';
import { FoodEntry } from '../models/FoodEntry';

// Define the Realm context
const RealmContext = createContext<Realm | null>(null);

// Create a custom hook to access the Realm context
export function useRealm() {
    const realm = useContext(RealmContext);
    if (!realm) {
        throw new Error('useRealm must be used within a RealmProvider');
    }
    return realm;
}

// FoodEntry CRUD component
export const FoodEntryManager: React.FC = ({ children }) => {
    const [realm, setRealm] = useState<Realm | null>(null);

    useEffect(() => {
        const setupRealm = async () => {
            try {
                const app = new Realm.App({ id: 'your_realm_app_id' }); // Replace with your Realm app id
                const user = await app.logIn(Realm.Credentials.anonymous());
                const config = {
                    schema: [FoodEntry.schema],
                    sync: {
                        user: user,
                        partitionValue: 'your_partition_key', // Replace with your partition key
                    },
                };
                const newRealm = await Realm.open(config);
                setRealm(newRealm);
            } catch (error) {
                console.error('Error setting up Realm:', error);
            }
        };

        setupRealm();
    }, []);

    // Function to create a new food entry
    const createFoodEntry = async (foodEntry: FoodEntry) => {
        if (realm) {
            realm.write(() => {
                realm.create('FoodEntry', foodEntry);
            });
        }
    };

    // Function to update a food entry
    const updateFoodEntry = async (foodEntry: FoodEntry) => {
        if (realm) {
            realm.write(() => {
                realm.create('FoodEntry', foodEntry, Realm.UpdateMode.Modified);
            });
        }
    };

    // Function to delete a food entry
    const deleteFoodEntry = async (foodEntry: FoodEntry) => {
        if (realm) {
            realm.write(() => {
                realm.delete(foodEntry);
            });
        }
    };

    // Function to get all food entries
    const getAllFoodEntries = () => {
        if (realm) {
            return realm.objects<FoodEntry>('FoodEntry');
        }
        return [];
    };

    return (
        <RealmContext.Provider value={realm}>
            {children}
        </RealmContext.Provider>
    );
};
