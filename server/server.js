import express from 'express';
import cors from 'cors';
import 'dotenv/config';


//initialize express app
const app = express();

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
