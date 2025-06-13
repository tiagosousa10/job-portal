import "./config/instrument.js"; // Importing the instrumentation configuration
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";

//initialize express app
const app = express();

//connect to MongoDB
await connectDB();
await connectCloudinary();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(clerkMiddleware());

//routes
app.get("/", (req, res) => res.send("Welcome to the server!"));

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhooks); // Clerk webhooks endpoint
app.use("/api/company", companyRoutes); // Company routes
app.use("/api/jobs", jobRoutes); // Job routes
app.use("/api/user", userRoutes); // User routes

//Port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
