import './config/instrument.js'; // Importing the instrumentation configuration
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from '@sentry/node';


//initialize express app
const app = express();

//connect to MongoDB
await connectDB()

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies


//routes
app.get('/', (req,res) => res.send('Welcome to the server!'));

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});


//Port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
