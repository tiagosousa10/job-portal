import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';


//initialize express app
const app = express();

//connect to MongoDB
await connectDB()

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies


//routes
app.get('/', (req,res) => res.send('Welcome to the server!'));

//Port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
