import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/database";
import authRoutes from './routes/authRoutes'; 
import userRoutes from "./routes/userRoutes";
import storyRoutes from './routes/storyRoutes';
import dotenv from 'dotenv';

dotenv.config();
const app: Application = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes)
app.use('/api', storyRoutes);
// Connect to database
connectDB();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
