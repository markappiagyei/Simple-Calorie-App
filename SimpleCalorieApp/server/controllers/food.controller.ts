import FoodEntry, {IFoodEntry} from '../models/foodEntry.model';

// Controller methods for CRUD operations on food entries
async function CreateFoodEntry({
  username,
  foodName,
  calorieValue,
  price,
  dateEaten,
}: IFoodEntry): Promise<IFoodEntry> {
  return FoodEntry.create({
    username: username,
    foodName: foodName,
    calorieValue: calorieValue,
    price: price,
    dateEaten: dateEaten,
  })
    .then((data: IFoodEntry) => {
      return data.save();
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function UpdateFoodEntry(
  id: string,
  {username, foodName, calorieValue, price, dateEaten}: IFoodEntry,
): Promise<IFoodEntry | null> {
  return FoodEntry.findOneAndUpdate(
    {
      _id: id,
    },
    {
      username: username,
      foodName: foodName,
      calorieValue: calorieValue,
      price: price,
      dateEaten: dateEaten,
    },
    {new: true},
  )
    .then((data: IFoodEntry | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function RemoveFoodEntry(id: string): Promise<IFoodEntry | null> {
  return FoodEntry.findOneAndRemove({
    _id: id,
  })
    .then((data: IFoodEntry | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function GetFoodEntries(): Promise<IFoodEntry[]> {
  return FoodEntry.find()
    .then((data: IFoodEntry[]) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function GetFoodEntriesForUser(username: string): Promise<IFoodEntry[]> {
  return FoodEntry.find({username: username})
    .then((data: IFoodEntry[]) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export default {
  CreateFoodEntry,
  UpdateFoodEntry,
  RemoveFoodEntry,
  GetFoodEntries,
  GetFoodEntriesForUser,
};
