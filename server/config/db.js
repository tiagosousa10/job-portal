import mongoose from "mongoose";

//function to connect to the database
const connectDB =  async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    })

    await mongoose.connect(`${process.env.MONGO_URI}/job-portal`)

  } catch (error) { 
    console.error("Error connecting to MongoDB:", error.message);
  }
}


export default connectDB;
