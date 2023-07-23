import {createRealmContext} from '@realm/react';
import {FoodEntry} from "./FoodEntySchema";

export const RealmContext = createRealmContext({
    schema: [FoodEntry]
})