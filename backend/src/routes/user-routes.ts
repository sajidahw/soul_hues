import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userLogout,
  userSignup,
  verifyUser,
} from "../controllers/user-controllers.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

// requests handler
// GET data request from backend or database; (/) is the root of the server
//req is request, res is response, next is next function to run
userRoutes.get("/", getAllUsers); // to get from controller

//user sign up via post request which triggers through validation before posting
userRoutes.post("/signup", validate(signupValidator), userSignup); // name, email, password validation
userRoutes.post("/login", validate(loginValidator), userLogin); // email, password validation
userRoutes.get("/auth-status", verifyToken, verifyUser); // middlware check
userRoutes.get("/logout", verifyToken, userLogout); // middlware check + remove cookies

export default userRoutes;
