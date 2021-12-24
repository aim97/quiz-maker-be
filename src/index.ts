import { app } from './app';
import { connectToDatabase } from './common/DBConnection';
require('dotenv').config();

const start = async () => {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
  });
};

start();