import { AiResponse, genrateTitle } from "../services/ai.service.js";

export async function sendMessages(req, res) {
    const { message } = req.body;
    
    const title = await genrateTitle(message)
    console.log(title) 
    const result = await AiResponse(message)
    res.json({
        AiMessage:result
    })
}