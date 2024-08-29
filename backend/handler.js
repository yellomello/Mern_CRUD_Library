import mongoose from "mongoose";
import { app } from "./index.js";
import { DBURL } from "./config.js";
import serverless from "serverless-http";

// Connect to the database
let cachedDb = null;
async function connectToDatabase() {
    if (cachedDb) {
      return cachedDb;
    }
  
    const database = await mongoose.connect(DBURL);
    cachedDb = database;
    return database;
  }
  
  // Lambda handler
  export const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    try {
      await connectToDatabase();
      console.log("Connected to database");
  
      const handler = serverless(app);
  
      // Call the handler with the event and context
      return await handler(event, context);
    } catch (error) {
      console.error("Error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal Server Error" }),
      };
    }
  };

