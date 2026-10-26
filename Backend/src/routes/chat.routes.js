import { Router } from "express";
import { sendMessages } from "../middlewares/chat.middleware.js";
import { authUser } from "../middlewares/auth.middleware.js";

const chatRouter = Router()

chatRouter.post("/messages", authUser, sendMessages);

export default chatRouter;