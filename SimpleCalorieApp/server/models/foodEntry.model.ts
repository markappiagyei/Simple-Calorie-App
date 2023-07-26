import mongoose, {Schema, Document} from 'mongoose';

// Interface for the FoodEntry model
export interface IFoodEntry extends Document {
  username: string;
  foodName: string;
  calorieValue: string;
  price: string;
  dateEaten: Date;
}

// Schema for the FoodEntry model
const FoodEntrySchema: Schema = new Schema({
    username: {type: String, required: true},
    foodName: {type: String, required: true},
    calorieValue: {type: String, required: true},
    price: {type: String, required: true},
    dateEaten: {type: Date, required: true},
  },
  {
    versionKey: false,
  },
);

// Export the model and return the IFoodEntry interface
export default mongoose.model<IFoodEntry>(
  'FoodEntry',
  FoodEntrySchema,
  'FoodEntry',
);
