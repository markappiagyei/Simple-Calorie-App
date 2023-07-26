export interface AverageCaloriesStatsResponse {
  avgCalories: number;
}

export interface AddedEntriesResponse {
  count: number;
}

export interface AddedEntriesStatsResponse {
  entriesFromPastSevenDays: AddedEntriesResponse;
  entriesWeekBeforePastSevenDays: AddedEntriesResponse;
}