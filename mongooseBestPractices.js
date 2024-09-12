// app.js

// Importing core modules and setting up dependencies
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// Initialize Express app
const app = express();

// Load environment variables
require("dotenv").config();

// Middleware setup for structured logging and enhanced security
app.use(morgan("dev")); // Logging middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Mongoose connection best practice: Using connection pooling and handling connection errors
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      poolSize: 10, // Enable connection pooling
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

connectToDatabase();

// Basic route setup (modular structure encourages scalability)
app.get("/", (req, res) => {
  res.send("Welcome to the Mongoose best practices app!");
});

// Gracefully handle uncaught exceptions and promise rejections
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Promise Rejection:", error);
  process.exit(1);
});

// Define the server port
const PORT = process.env.PORT || 5000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Additional comments:
// 1. Modularize the app further by creating separate route and model files for cleaner organization.
// 2. Follow naming conventions for all models and controllers.
