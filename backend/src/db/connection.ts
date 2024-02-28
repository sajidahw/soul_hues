// connect to MongoDB via Mongoose for writing mongodb validation, casting and business logic

import { connect, disconnect } from "mongoose"; // db connection

// async bc need to wait for connection to be established using .env file's mongodb var for url;
// connection functions with promise
async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL); // using.env file
  } catch (error) {
    console.log(error); // shows in terminal
    throw new Error("Oops, can't connect to MongoDb!");
  }
}

// disconnect from database
async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error); // shows in terminal
    throw new Error("Oops, can't disonnect from MongoDb!");
  }
}

//exporting above created functions
export { connectToDatabase, disconnectFromDatabase };
