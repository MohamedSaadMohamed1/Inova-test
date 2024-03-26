
  import mongoose from "mongoose";

const mongoUrl: string = "mongodb://127.0.0.1:27017/local";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); 
  }
};

export default connectDB;
