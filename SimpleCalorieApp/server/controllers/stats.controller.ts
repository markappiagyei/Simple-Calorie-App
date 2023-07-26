import {
  AverageCaloriesStatsResponse,
  AddedEntriesResponse,
  AddedEntriesStatsResponse,
} from '../models/stats.model';
import FoodEntry from '../models/foodEntry.model';

async function GetAverageCaloriesForAllUsersInLastSevenDays(): Promise<AverageCaloriesStatsResponse> {
  // Get the average calories for all users in the last seven days
  return (
    FoodEntry.aggregate([
      // Filter for the last seven days
      {
        $match: {
          dateEaten: {
            $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
      // Convert the calorieValue field to an integer
      {
        $addFields: {
          calorieValue: {$toInt: '$calorieValue'},
        },
      },
      // Group by to get the average of all the calorieValues
      {
        $group: {
          _id: null,
          avgCalories: {$avg: '$calorieValue'},
        },
      },
    ])
      // Return the average calories
      .then((data: {avgCalories: number}[]) => {
        if (data.length > 0) {
          return data[0];
        } else {
          return {avgCalories: 0};
        }
      })
      .catch((error: Error) => {
        throw error;
      })
  );
}

async function GetAddedEntriesFromLastSevenDays(): Promise<AddedEntriesResponse> {
  // Get the entries from the last seven days
  return FoodEntry.aggregate([
    // Filter for the last seven days
    {
      $match: {
        dateEaten: {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    },
    // Group by to get the count of all the entries
    {
      $group: {
        _id: null,
        count: {$sum: 1},
      },
    },
  ])
    .then((data: {count: number}[]) => {
      if (data.length > 0) {
        return data[0];
      } else {
        return {count: 0};
      }
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function GetAddedEntriesFromWeekBeforeLastSevenDays(): Promise<AddedEntriesResponse> {
  // Get the entries from the week before the last seven days
  return FoodEntry.aggregate([
    // Filter for the week before the last seven days
    {
      $match: {
        dateEaten: {
          $gte: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000),
          $lte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    },
    // Group by to get the count of all the entries
    {
      $group: {
        _id: null,
        count: {$sum: 1},
      },
    },
  ])
    .then((data: {count: number}[]) => {
      if (data.length > 0) {
        return data[0];
      } else {
        return {count: 0};
      }
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function GetEntriesFromLastSevenDaysAndWeekBefore(): Promise<AddedEntriesStatsResponse> {
  // Get the entries from the last seven days
  const lastSevenDays = await GetAddedEntriesFromLastSevenDays();
  // Get the entries from the week before the last seven days
  const weekBeforeLastSevenDays =
    await GetAddedEntriesFromWeekBeforeLastSevenDays();

  // Return the entries from the last seven days and the week before the last seven days
  return {
    entriesFromPastSevenDays: lastSevenDays,
    entriesWeekBeforePastSevenDays: weekBeforeLastSevenDays,
  };
}

export default {
  GetAverageCaloriesForAllUsersInLastSevenDays,
  GetEntriesFromLastSevenDaysAndWeekBefore,
};
