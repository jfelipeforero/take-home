import { Express, Request, Response } from "express";
import { generateImageHandler, generatePromptHandler } from "./controller/chatgpt.controller";

function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200)
    })

    app.post('/openai/prompt', generatePromptHandler)
 
    app.post('/openai/image', generateImageHandler)
}

export default routes;
