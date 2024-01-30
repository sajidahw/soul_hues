// using typescript, this is MAIN SERVER FILE root file for backend

import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

// connections and listeners
// open up developement server on port 4000 with callback function
const PORT = process.env.PORT || 6000; // using port from .env file or 6000 if not available
connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log("Server is open and connected to MongoDB! 🤘"));
  })
  .catch((err) => console.log(err));