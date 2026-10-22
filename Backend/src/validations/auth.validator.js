import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "validation error",
            success: false,
            errors: errors.array()
        })
    }
    next();
}

export const registerValidator = [
    body("username").trim().isString().withMessage("username should be string"),
    body("email").trim().isEmail().withMessage("email should be in email format"),
    body("password").trim().isString().isLength({ min: 6 }).withMessage("password should be string and minimum 6 character long"),
    validate
]
export const loginValidator = [
    body("email").trim().isEmail().withMessage("email should be in email format"),
    body("password").trim().isString().isLength({ min: 6 }).withMessage("password should be string and minimum 6 character long"),
    validate
]
