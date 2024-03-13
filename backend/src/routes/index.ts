import { Router } from "express";
import userRoutes from "./user-routes.js"; // route endpoints
import chatRoutes from "./chat-routes.js"; // route endpoints

const appRouter = Router();

// dynamic routing endpoints handled by userRoutes, chatRoutes
appRouter.use("/user", userRoutes); //domain/api/v1/user

appRouter.use("/chat", chatRoutes); //domain/api/v1/chats

export default appRouter;
