import app from './app';
import dotenv from 'dotenv'
import connectDB from './db/connect.js'

dotenv.config({ path: 'src/.env' })
const port = process.env.PORT;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();