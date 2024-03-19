import { Router } from "express";
import userRoutes from "./user-routes.js"; // route endpoints
import chatRoutes from "./chat-routes.js"; // route endpoints
import imageRoutes from "./image-routes.js";

const appRouter = Router();

// dynamic routing endpoints handled by userRoutes, chatRoutes using OpenAI model endpoints for /chat, /images
appRouter.use("/user", userRoutes); //domain/api/v1/user

appRouter.use("/chat", chatRoutes); //domain/api/v1/chats

appRouter.use("/images", imageRoutes); //domain/api/v1/images for dall-e-2, dall-e-3

export default appRouter;
