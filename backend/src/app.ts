
// creating express app for backend server
import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";


config(); // to use .env file
const app = express();

// middleware are functions which gets executed *before* a request is processed. Within Node and Express, middleware is used to check JSON body validations, token/cookie validations, param validations etc.

// middleware using express where will pass incoming data in JSON format
app.use(express.json());

// middleware for using token to create cookies to pass from backend to frontend user stored in browser
app.use(cookieParser(process.env.COOKIE_SECRET));

// remove from production
app.use(morgan("dev")); // using morgan for logging requests, responses and status codes

app.use("/api/v1", appRouter); // endpoint transfers to appRouter from routes/index.ts


export default app; // exporting app to use in index.ts