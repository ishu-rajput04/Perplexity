import express from "express"
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
   origin:"http://localhost:5173",
   credentials:true
}))
app.use(morgan("dev"))  
/*
authRouter is used to handle all the routes related to authentication. It is mounted on the /api/auth path, so any requests to /api/auth will be handled by the authRouter. 
 */
app.use("/api/auth", authRouter)

export default app;