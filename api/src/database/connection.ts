import mongoose from 'mongoose';
import { getEnv } from '../utils/helpers';

interface Options extends mongoose.ConnectOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(getEnv('MONGO_URI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as Options);

    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
