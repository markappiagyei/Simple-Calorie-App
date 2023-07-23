import React, {createContext, ReactNode, useState} from 'react';


const initialFoodEntries = [
    {
        id: '1',
        foodName: 'Banana',
        calorieValue: '105',
        price: '0,70',
        dateEaten: new Date('2023-07-19'),
    },
    {
        id: '2',
        foodName: 'Chicken Salad',
        calorieValue: '350',
        price: '3,95',
        dateEaten: new Date('2023-07-19'),
    },
    {
        id: '3',
        foodName: 'Cheeseburger',
        calorieValue: '500',
        price: '0,70',
        dateEaten: new Date('2023-07-18'),
    },
    {
        id: '4',
        foodName: 'Apple',
        calorieValue: '95',
        price: '0,70',
        dateEaten: new Date('2023-07-18'),
    },
];


// Create the context
// @ts-ignore
export const FoodContext = createContext();

// Create the provider component
export const FoodProvider = ({ children }: { children: ReactNode }) => {
    const [foodEntries, setFoodEntries] = useState(initialFoodEntries);

    return (
        <FoodContext.Provider value={{ foodEntries, setFoodEntries }}>
    {children}
    </FoodContext.Provider>
);
};