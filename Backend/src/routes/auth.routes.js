import { Router } from "express";
import { getMeController, loginController, registerController, verifyEmailController } from "../controllers/auth.controllers.js";
import { loginValidator, registerValidator } from "../validations/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();


/** 
@route   POST /api/auth/register
@desc    Register a new user
@access  Public
@body  {username, email, password}
*/
authRouter.post("/register", registerValidator, registerController)

/**
 * @route POST /api/auth/login
 * @desc login a user
 * @access public
 * @body {username, email, password}
 */
authRouter.post("/login", loginValidator, loginController)


/**
 * @route GET /api/auth/get-me
 * @desc get the login user dets
 * @access private
 */
authRouter.get("/get-me", authUser, getMeController)

/** 
@route   GET /api/auth/verify-email
@desc    Verify user's email
@access  Public
@query { token: string } - The email verification token sent to the user's email
*/
authRouter.get("/verify-email", verifyEmailController)

export default authRouter 