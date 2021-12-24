import mongoose from 'mongoose';

export const connectToDatabase = async () => mongoose.connect(process.env.MONGO_URI!);