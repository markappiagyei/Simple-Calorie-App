import { BSON } from 'realm';


export interface FoodEntry {
    _id: BSON.ObjectId;
    foodName: string; // Food/product name (i.e. Milk, banana, hamburger)
    calorieValue: string; // Calorie value (numeric value)
    price: string; // Calorie value (numeric value)
    dateEaten: Date; // Date/time when the food was taken
}

export class FoodEntry extends Realm.Object<FoodEntry> {
    _id!: BSON.ObjectId;
    foodName: string;
    calorieValue: string;
    price: string;
    dateEaten: Date;

    static schema: Realm.ObjectSchema = {
        name: 'FoodEntry',
        primaryKey: '_id',
        properties: {
            // This allows us to automatically generate a unique _id for each Item
            _id: { type: 'objectId', default: () => new BSON.ObjectId() },
            foodName: 'string',
            calorieValue: 'string',
            price: 'string',
            dateEaten: 'string',


        },
    };
}
