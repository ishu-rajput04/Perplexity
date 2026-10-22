
import MessageParser from "nodemailer/lib/dkim/message-parser.js";
import userModel from "../models/user.model.js";
import { sendEmail } from "../services/email.service.js";
import jwt from "jsonwebtoken"

export async function registerController(req, res) {
    const { username, email, password } = req.body;
    const isuserExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isuserExist) {
        return res.status(400).json({
            message: `user alerady exist with this ${isuserExist.username === username ? "username" : "email"}`,
            success: false
        })
    }

    const user = await userModel.create({
        username,
        email,
        password
    })
    const emailToken = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET,)

    sendEmail({
        to: email,
        subject: "Welcome to Gen AI",
        html: `<h1>Welcome to Gen AI</h1>
        <p>Hi ${username},</p>
        <p>Thank you for registering with us. Please click the link below to verify your email address:</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailToken}">Verify Email</a>
        <p>If you did not register for this account, please ignore this email.</p>
        <p>Best regards,</p>
        <p>The Gen AI Team</p>
        `
    })
    res.status(201).json({
        message: "user register successfully.",
        success: true,
        user
    })
}

export async function loginController(req, res) {

    const { email, password } = req.body

    const isuserExist = await userModel.findOne({ email }).select("+password")
    if (!isuserExist) {
        return res.status(400).json({
            message: "user not found with this email.",
            success: false
        })
    }

    const isPswdMatch = await isuserExist.comparePassword(password)
    if (!isPswdMatch) {
        return res.status(400).json({
            message: "password not match.",
            success: false
        })
    }

    // verified status
    if (!isuserExist.verified) {
        return res.status(400).json({
            message: "unauthorized user. pls verify your email",
            success: false
        })
    }

    const token = jwt.sign({
        id: isuserExist._id
    }, process.env.JWT_SECRET, { expiresIn: "3d" })
    res.cookie("token", token)

    res.status(200).json({
        message: "user login successsfully.",
        success: true
    })
}

export async function getMeController(req, res) {
    const userId = req.user.id

    const user = await userModel.findById(userId)
    if (!user) {
        return res.status(400).json({
            message: "unauthorized user",
            success: false
        })
    }
    res.status(200).json({
        message: "user details fetched successfully.",
        success: true,
        user
    })
}
export async function verifyEmailController(req, res) {
    const { token } = req.query;
    if (!token) {
        return res.status(400).json({
            message: "token is required",
            success: false
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded.id)
    if (!user) {
        return res.status(400).json({
            message: "Invalid token",
            success: false
        })
    }
    user.verified = true
    await user.save()

    const html = `
        <h1>Email Verified Successfully</h1>
        <p>Hi ${user.username},</p>
        <p>Your email address has been verified successfully.</p>
        <p>Best regards,</p>
        <p>The Gen AI Team</p>
    `;
    sendEmail({
        to: user.email,
        subject: "Email Verified Successfully",
        html
    });
    res.send(html)
    res.status(200).json({
        message: "Email verified successfully",
        success: true
    })
}