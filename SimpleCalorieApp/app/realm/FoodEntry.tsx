import Realm from 'realm';


 export class FoodEntry {
     _id: string;
     username: string;
     foodName: string;
     calorieValue: string ;
     price: string;
     dateEaten: Date;
}

export class AverageCaloriesStatsResponse {
    avgCalories: number;
}

export class AddedEntriesResponse {
    count: number;
}

export class AddedEntriesStatsResponse {
    entriesFromPastSevenDays: AddedEntriesResponse;
    entriesWeekBeforePastSevenDays: AddedEntriesResponse;
}

