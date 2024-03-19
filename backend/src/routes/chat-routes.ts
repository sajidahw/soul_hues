import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controllers.js";

// protected API only accessible to authenticated logged in users [lots of middleware to go through]
const chatRoutes = Router();
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
); // verifying a message exists before verifying token

// so chats stored in db all appear once logged in
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser); // verifying a msg exists before verifying token

// del db stored chats
chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;
