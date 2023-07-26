import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FoodContext from "../app/context/FoodContext";
import axios from "axios";
import {AddedEntriesStatsResponse, AverageCaloriesStatsResponse} from "../app/realm/FoodEntry";


const AdminReportScreen = () => {
    const { foodEntries, setFoodEntries, loading, deleteFoodEntry }: any = useContext(FoodContext);
    const [reportData, setReportData] = useState<any>(null);

    const [averageCalories, setAverageCalories] = useState<number | null>(null);
    const [entriesStats, setEntriesStats] = useState<AddedEntriesStatsResponse | null>(
        null
    );
    // Replace 'your-jwt-token' with the actual JWT token you have for authentication
    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiSm9lIiwiaWF0IjoxNjkwMzg2MzQwLCJleHAiOjE2OTE1OTU5NDB9.btgimwFrxGWPEY4C9g-ymyZiakfa0-t9S4R-94D6T_0';

    async function GetFoodEntries(){
        const apiUrl = 'http://10.0.2.2:8089/api/food ';

        await axios.get<AddedEntriesStatsResponse>(apiUrl, {
            headers: {
                Authorization: jwtToken,
            },
        })
            .then((response) => {
                // Assuming the backend API returns an array of IFoodEntry objects
                setFoodEntries(response.data)
            })
            .catch((error) => {
                // Handle any error that might occur during the API call
                console.error('Error fetching food entries:', error);
                console.log(error.status)
            });
    }

    async function GetPast14DaysEntries(){

        // Fetch food entries from the backend API
        const apiUrl = 'http://10.0.2.2:8089/api/stats/entries ';


        await axios.get<AddedEntriesStatsResponse>(apiUrl, {
            headers: {
                Authorization: jwtToken,
            },
        })
            .then((response) => {
                // Assuming the backend API returns an array of IFoodEntry objects
                 setEntriesStats(response.data)
            })
            .catch((error) => {
                // Handle any error that might occur during the API call
                console.error('Error fetching food entries:', error);
                console.log(error.status)
            });
    }


    async function GetAverageCalories(){
        const apiUrl = 'http://10.0.2.2:8089/api/stats/calories';

        await axios.get<AverageCaloriesStatsResponse>(apiUrl, {
            headers: {
                Authorization: jwtToken,
            },
        })
            .then((response) => {
                // Assuming the backend API returns an array of IFoodEntry objects
                 setAverageCalories(response.data.avgCalories)
            })
            .catch((error) => {
                // Handle any error that might occur during the API call
                console.error('Error fetching food entries:', error);
                console.log(error.status)
            });

    }

    useEffect(() => {
        GetPast14DaysEntries()
        GetAverageCalories()
        GetFoodEntries()
        setReportData({
            averageCalories,
            entriesStats

        });

    }, [foodEntries]);

    const handleDeleteEntry = (entryId: string) => {
        // Implement delete functionality here
        // Use the deleteFoodEntry function from the FoodContext to delete the entry
        deleteFoodEntry(entryId);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Screen</Text>
            {reportData && ( // Check if reportData is not null
                <>
                    <Text>
                        Entries added in the Last 7 days: {reportData.entriesStats?.entriesFromPastSevenDays?.count}
                    </Text>
                    <Text>
                        Entries added in the week before the last 7 days: {reportData.entriesStats?.entriesWeekBeforePastSevenDays?.count}
                    </Text>
                    <Text>Average calories per user: {reportData.averageCalories?.toFixed(2)}</Text>
                </>
            )}
            <Text style={styles.listTitle}>Food Entries:</Text>
            <FlatList
                data={foodEntries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.foodEntry}>
                        <Text style={styles.foodName}>{item.foodName}</Text>
                        <Text style={styles.price}>{item.price} euro</Text>
                        <Text style={styles.calorieAmount}>{item.calorieValue} cal</Text>
                    </View>
                )}
            />
        </View>
    );
};








    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 60,
        justifyContent: 'center',
    },
    foodEntry: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 30,
        padding: 10,
        width: "100%",
    },
    foodName: {
        flex: 1,
        fontSize: 18,
        color: "black",
        textAlign: "left",
    },
    calorieAmount: {
        fontSize: 18,
        color: "black",
        textAlign: "center",
        width: 100,
    },
    price: {
        fontSize: 18,
        color: "black",
        textAlign: "right",
        width: 80,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    entryItem: {
        marginTop: 10,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
    },
});

export default AdminReportScreen;
