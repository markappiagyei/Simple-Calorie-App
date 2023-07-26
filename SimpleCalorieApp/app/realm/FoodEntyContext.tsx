import Realm from 'realm';
import {createRealmContext} from "@realm/react";


 export class FoodEntry extends Realm.Object{
     _id!: Realm.BSON.ObjectId;
     foodName!: string; // Food/product name (i.e. Milk, banana, hamburger)
     calorieValue!: string ;// Calorie value (numeric value)
     price!: string; // Calorie value (numeric value)
     dateEaten!: Date; // Date/time when the food was taken

     static schema =  {
         name: 'FoodEntry',
         properties: {
             _id: "objectId",
             foodName: "string", // Food/product name (i.e. Milk, banana, hamburger)
             calorieValue: "string", // Calorie value (numeric value)
             price: "string", // Calorie value (numeric value)
             dateEaten: {type:"date", default: Date.now()} // Date/time when the food was taken
         }

     }
}


export const foodEntryContext = createRealmContext({
    schema: [FoodEntry],
    deleteRealmIfMigrationNeeded: true,
    onFirstOpen(realm){
        realm.create('FoodEntry',{
            _id: new Realm.BSON.ObjectId(),
            foodName: "Hamburger",
            calorieValue: "500",
            price: "4.54",
            dateEaten: Date.now()
        })
    }
})
