import "dotenv/config";
import app from "./src/app.js";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import connectToDB from "./src/config/database.js"; 
// import { GenAI } from "./src/services/ai.service.js";
 
connectToDB();  
// GenAI() 
app.listen(3000, () => {
    console.log("server is running on port 3000.")
})

// health route

app.get("/", (req, res)=>{
    res.send("Server is Running Buddy.")
})
