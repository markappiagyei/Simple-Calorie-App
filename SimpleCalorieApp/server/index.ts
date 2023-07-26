import express, {Request, Response, Application} from 'express';
import bodyParser from 'body-parser';
import connect from './server';
import FoodController from './controllers/food.controller';
import StatsController from './controllers/stats.controller';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import JwtPayload from './models/jwt.model';

// Set up environment variables
dotenv.config();
export const DATABASE = process.env.DATABASE!;
export const JWT_SECRET = process.env.JWT_SECRET!;

// Set up express
const app: Application = express();
const port = 8089;

// Set up body parser
app.use(bodyParser.json());

// Setup get request
app.get('/api', (req: Request, res: Response) =>
  res.send('Welcome to the Food API!'),
);

// Get all food entries
app.get('/api/food', async (req, res) => {
  try {
    // Verify that the user is an admin
    const decoded = jwt.verify(
      <string>req.headers.authorization,
      JWT_SECRET,
    ) as JwtPayload;
    if (decoded.role === 'admin') {
      // Get all food entries
      const foodEntries = await FoodController.GetFoodEntries();
      res.send(foodEntries);
      return;
    }
  } catch (err) {
    res.sendStatus(401).send('Unauthorized');
  }
});

// Get all food entries for a user
app.get('/api/food/:username', async (req, res) => {
  try {
    // Verify that the user is an admin or the user is the same as the username in the request
    const decoded = jwt.verify(
      <string>req.headers.authorization,
      JWT_SECRET,
    ) as JwtPayload;
    if (decoded.role === 'admin' || decoded.name === req.params.username) {
      // Get all food entries for the user
      const foodEntries = await FoodController.GetFoodEntriesForUser(
        req.params.username,
      );
      res.send(foodEntries);
      return;
    }
  } catch (err) {
    res.sendStatus(401).send('Unauthorized');
  }
});

// Create food entry
app.post('/api/create', async (req, res) => {
  try {
    const decoded = jwt.verify(
      <string>req.headers.authorization,
      JWT_SECRET,
    ) as JwtPayload;
    // Verify that the user is an admin or a user and the user is the same as the username in the request
    if (
      decoded.role === 'admin' ||
      (decoded.role === 'user' && decoded.name === req.body.username)
    ) {
      // Create food entry
      const foodEntry = await FoodController.CreateFoodEntry(req.body);
      res.send(foodEntry);
      return;
    } else {
      res
        .status(401)
        .send(
          'You do not have the correct permissions to create a food entry. Please recheck the information you have entered.',
        );
    }
  } catch (err) {
    res.sendStatus(401).send('Unauthorized');
  }
});

// Update food entry
app.put('/api/update/:id', async (req, res) => {
  try {
    const decoded = jwt.verify(
      <string>req.headers.authorization,
      JWT_SECRET,
    ) as JwtPayload;
    // Verify that the user is an admin or a user and the user is the same as the username in the request
    if (
      decoded.role === 'admin' ||
      (decoded.role === 'user' && decoded.name === req.body.username)
    ) {
      // Update food entry
      const foodEntry = await FoodController.UpdateFoodEntry(
        req.params.id,
        req.body,
      );
      res.send(foodEntry);
    }
  } catch (err) {
    res.sendStatus(401).send('Unauthorized');
  }
});

// Delete food entry
app.delete('/api/remove/:id', async (req, res) => {
  try {
    const decoded = jwt.verify(
      <string>req.headers.authorization,
      JWT_SECRET,
    ) as JwtPayload;
    // Verify that the user is an admin or a user and the user is the same as the username in the request
    if (
      decoded.role === 'admin' ||
      (decoded.role === 'user' && decoded.name === req.body.username)
    ) {
      const foodEntry = await FoodController.RemoveFoodEntry(req.params.id);
      res.send(foodEntry);
    }
  } catch (err) {
    res.sendStatus(401).send('Unauthorized');
  }
});

app.get('/api/stats/calories', async (req, res) => {
  try {
    const decoded = jwt.verify(
      <string>req.headers.authorization,
      JWT_SECRET,
    ) as JwtPayload;
    if (decoded.role === 'admin') {
      const stats =
        await StatsController.GetAverageCaloriesForAllUsersInLastSevenDays();

      res.send(stats);
    }
  } catch (err) {
    res.sendStatus(401).send('Unauthorized');
  }
});

app.get('/api/stats/entries', async (req, res) => {
  try {
    const decoded = jwt.verify(
      <string>req.headers.authorization,
      JWT_SECRET,
    ) as JwtPayload;
    if (decoded.role === 'admin') {
      const stats =
        await StatsController.GetEntriesFromLastSevenDaysAndWeekBefore();

      res.send(stats);
    }
  } catch (err) {
    res.sendStatus(401).send('Unauthorized');
  }
});

// Start server
app.listen(port, () =>
  console.log(`Application started successfully on port ${port}.`),
);

// @ts-ignore
// Connect to database
connect({
  db: DATABASE,
});
