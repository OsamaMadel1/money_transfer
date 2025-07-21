import mongoose from 'mongoose';

export default async function connectDB() {
  const url = process.env.MONGO_URL;

  if (!url) {
    throw new Error('MONGO_URL not found in environment variables.');
  }

  await mongoose.connect(url); 

  console.log('Connected to MongoDB');
}
