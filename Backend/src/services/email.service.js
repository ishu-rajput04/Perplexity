import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER, 
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
})

transporter.verify((err, success) => {
    if (err) {
        console.log("Error in connecting to Email Server:", err)
    }
    else {
        console.log("Email server is ready to send message.")
    }
})

export const sendEmail = async ({ to, subject, html }) => {
    const info = await transporter.sendMail({
        from: `"Gen AI" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    })
    console.log(info)
    return `Email successfully sent to ${to}`;
}