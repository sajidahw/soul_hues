// // handles incoming API requests for users
import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt"; // encrypts user string pw before storing to db; compares against it
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

//req is request, res is response, next is next function to run of middleware

// API request getting all the users from the database
export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //get all users from db
        const users = await User.find(); // finding all record info for users (not specifying which info)
        return res.status(200).json({ message: "OK", users }); // response for status code 200 to all users
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "ERROR", cause: error.message });
    }
};// when testing use http://localhost:PORT/api/users in postman and in terminal use npm run dev

// API request for signing up a user
export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //create user signup
        const { name, email, password } = req.body; // creating vars & saving from frontend req.body

        // check to ensure email address hasn't been previously used before by the same user
        const existingUser = await User.findOne({ email });

        // email/user does exist, send unauthorized status with message; validation check
        if (existingUser) return res.status(401).send("Whoops, User has already been registered.")

        const hashedPassword = await hash(password, 10); // 10 rounds of encryption added to pw before being stored to db
        const user = new User({ name, email, password: hashedPassword }); // creating new user instance, need to encrypt password here in backend
        await user.save();

        // create token and store cookie
        // remove previous cookie if exists to get a new cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        // create a token for user authentication
        const userToken = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); // expires in 7 days

        // cookies are based on a token which comes from backend to frontend
        // cookie created inside of the browser with cookie name, token is cookie value, 
        // with parameters of where cookie is stored in the root/ path, domain, expiration date, 
        res.cookie(COOKIE_NAME, userToken, {
            path: "/", // root folder
            domain: "localhost",
            expires,
            httpOnly: true, // cookie can't be accessed by javascript
            signed: true, // encrypt cookie
        }); // cookie is created and sent to frontend

        return res.status(201).json({ message: "OK", id: user._id.toString() }); // response for status code 200 to all users, can see user or userid converted to string from json
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "ERROR", cause: error.message });
    }
};


export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //create user login
        const { email, password } = req.body; // creating vars & saving from frontend req.body

        // find user by email, checking validation on user to see if already exist via email check
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("Uhoh, User is not registered."); // user will need to register before logging in
        }

        // validating password by comparing the string entered by user to the encrypted password stored to user
        const isPasswordCorrect = await compare(password, user.password); // comparing password from frontend to password in db w/boolean value
        if (!isPasswordCorrect) {// 403 is forbidden
            return res.status(403).send("That's an incorrect password. Try again!"); // if password is incorrect, send error message
        }

        // remove previous cookie if exists to get a new cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        // create a token for user authentication
        const userToken = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); // expires in 7 days

        // cookies are based on a token which comes from backend to frontend
        // cookie created inside of the browser with cookie name, token is cookie value, 
        // with parameters of where cookie is stored in the root/ path, domain, expiration date, 
        res.cookie(COOKIE_NAME, userToken, {
            path: "/", // root folder
            domain: "localhost",
            expires,
            httpOnly: true, // cookie can't be accessed by javascript
            signed: true, // encrypt cookie
        }); // cookie is created and sent to frontend


        // user is authenticated after email and pw checks
        return res.status(200).json({ message: "OK", id: user._id.toString() })
        // response for status code 200 to all users, can see user or userid converted to string from json
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "ERROR", cause: error.message });
    }
};