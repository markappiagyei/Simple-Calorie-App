import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FoodContext from "../app/context/FoodContext";

const AdminReportScreen = () => {
    const { foodEntries, loading, deleteFoodEntry } = useContext(FoodContext);
    const [reportData, setReportData] = useState<any>(null);

    useEffect(() => {
        // Calculate the required report data here
        // Number of added entries in the last 7 days vs. added entries the week before that
        // The average number of calories added per user for the last 7 days
        // You can use the foodEntries state from the FoodContext to calculate the statistics

        // For example:
        const lastWeekEntries = foodEntries.filter((entry) => {
            // Calculate entries added in the last 7 days here
        });

        const weekBeforeLastEntries = foodEntries.filter((entry) => {
            // Calculate entries added in the week before that here
        });

        const averageCaloriesPerUser = 0; // Calculate average calories per user here

        setReportData({
            lastWeekEntries,
            weekBeforeLastEntries,
            averageCaloriesPerUser,
        });
    }, [foodEntries]);

    const handleDeleteEntry = (entryId: string) => {
        // Implement delete functionality here
        // Use the deleteFoodEntry function from the FoodContext to delete the entry
        deleteFoodEntry(entryId);
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Screen</Text>
            <Text>Last 7 days: {reportData?.lastWeekEntries.length}</Text>
            <Text>Week before last: {reportData?.weekBeforeLastEntries.length}</Text>
            <Text>Average calories per user: {reportData?.averageCaloriesPerUser}</Text>
            <Text style={styles.listTitle}>Food Entries:</Text>
            <FlatList
                data={foodEntries}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.entryItem}>
                        <Text>{item.name}</Text>
                        <Text>Calories: {item.calories}</Text>
                        <Text>Date: {item.date}</Text>
                        <Text onPress={() => handleDeleteEntry(item._id)}>Delete</Text>
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
        justifyContent: 'center',
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
