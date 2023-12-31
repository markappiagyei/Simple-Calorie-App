import React, { createContext, useEffect, useState } from 'react';
import axios from "axios/index";
import {FoodEntry} from "../realm/FoodEntry";


const FoodContext = createContext({});

export const FoodProvider = ({ children }: any) => {
    const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // gets the foodEntries for the providers using the token
    useEffect(() => {
        const apiUrl = 'http://10.0.2.2:8089/api/food';

        const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiSm9lIiwiaWF0IjoxNjkwMzg2MzQwLCJleHAiOjE2OTE1OTU5NDB9.btgimwFrxGWPEY4C9g-ymyZiakfa0-t9S4R-94D6T_0';

        axios.get(apiUrl, {
            headers: {
                Authorization: jwtToken,
            },
        })
            .then((response) => {
                // Assuming the backend API returns an array of IFoodEntry objects
                setFoodEntries(response.data);
            })
            .catch((error) => {
                // Handle any error that might occur during the API call
                console.error('Error fetching food entries:', error);
                console.log(error.status)
            });
    }, []);


    return (

        <FoodContext.Provider
            value={{ foodEntries, setFoodEntries,setUser, user, loading}}
        >
            {children}
        </FoodContext.Provider>
    );
};

export default FoodContext;