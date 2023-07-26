import mongoose from 'mongoose';

// Define the connection string to the MongoDB database
type MInput = {
  db: string;
};

// Connect to the database
export default ({db}: MInput) => {
  const connect = () => {
    mongoose
      .connect(db)
      .then(() => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch(error => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
