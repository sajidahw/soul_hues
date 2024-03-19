import { Router } from "express";
import { generateImage } from "../controllers/image-controllers.js";

// protected API only accessible to authenticated logged in users [lots of middleware to go through]
const imageRoutes = Router();
imageRoutes.post("/get-image", generateImage); //api/v1/images/get-image is where delivered to

// // so chats all appear once logged in
// imageRoutes.get("/all-chats",); // verifying a msg exists before verifying token

// imageRoutes.delete("/delete", verifyToken, deleteChats);

export default imageRoutes;
