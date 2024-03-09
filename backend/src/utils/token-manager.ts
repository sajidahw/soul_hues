//manages token for authentication
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email }; // payload = set of fields included in generated token for specific user; not encrypted
  const userToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return userToken;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // sending cookies along with the request
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    return res
      .status(401)
      .json({ message: "Oops, Token hasn't been received!" });
  }
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        return res
          .status(401)
          .json({ message: "Oh no, your token has expired!" });
      } else {
        // console.log("Token has been verified!");
        resolve();
        res.locals.jwtData = success;
        return next(); // next middleware
      }
    });
  });
};
