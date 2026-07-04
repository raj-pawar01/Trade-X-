require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const URL = process.env.MONGO_URL;

if (!URL) {
  console.error("Error: MONGO_URL not found in environment variables.");
  process.exit(1);
}

const requiredCollections = ["users", "holdings", "positions", "orders", "transactions"];

async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(URL);
    console.log("Database connected successfully.");

    const db = mongoose.connection.db;

    // Get all collections in the database
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    console.log("Found collections in database:", collectionNames);

    // Drop unnecessary collections
    for (const name of collectionNames) {
      if (!requiredCollections.includes(name)) {
        console.log(`Dropping unnecessary collection: ${name}`);
        await db.dropCollection(name);
      }
    }

    // Set up schemas/models for user creation
    const { UserModel } = require("./model/UserModel");

    // Remove any existing demo user to ensure a clean slate
    console.log("Cleaning up existing demo user if present...");
    await UserModel.deleteMany({
      $or: [
        { username: "demouser" },
        { email: "demo@example.com" }
      ]
    });

    // Create the demo user
    console.log("Creating new demo user...");
    const hashedPassword = await bcrypt.hash("demopassword", 10);
    const demoUser = new UserModel({
      username: "demouser",
      email: "demo@example.com",
      password: hashedPassword,
      mobile: "9876543210",
      funds: 100000.00
    });

    await demoUser.save();
    console.log("Demo user created successfully!");
    console.log("-----------------------------------------");
    console.log("Demo User Login Credentials:");
    console.log("Email:    demo@example.com");
    console.log("Password: demopassword");
    console.log("-----------------------------------------");

    await mongoose.disconnect();
    console.log("Disconnected from database.");
  } catch (err) {
    console.error("An error occurred during execution:", err);
    process.exit(1);
  }
}

run();
