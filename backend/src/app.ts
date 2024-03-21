// creating express app for backend server, main server is on index.ts
import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"; // installed to allow cross-origin requests from different servers ie frontend to backend

config(); // to use .env file
const app = express();

// middleware are functions which gets executed *before* a request is processed. Within Node and Express, middleware is used to check JSON body validations, token/cookie validations, param validations etc.

// for cors so this way if frontend is using another server port, and the backend is set up on another port, it will still recognize and allow communication to happen between the two; extra secure by specifying where opening from from browser
// app.use(cors({ origin: "http://localhost:5173", credentials: true })); // exchanging http only cookies with credentials
const corsOptions = {
  origin: "http://localhost:5173", // frontend
  credentials: true, //access-control-allow-credentials:true
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// middleware using express where will pass incoming data in JSON format
app.use(express.json());

// middleware for using token to create cookies to pass from backend to frontend user stored in browser
app.use(cookieParser(process.env.COOKIE_SECRET));

// remove from production
app.use(morgan("dev")); // using morgan for logging requests, responses and status codes

app.use("/api/v1", appRouter); // endpoint transfers to appRouter from routes/index.ts

export default app; // exporting app to use in index.ts

// backend to front end is listed in frontend's main.tsx via axios:
//axios.defaults.baseURL = "http://localhost:5050/api/v1";
//

// exporting the Express API to Vercel to be a serverless function
module.exports = app;
