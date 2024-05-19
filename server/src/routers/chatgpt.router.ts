import { z } from "zod";
import logger from "../utils/logger";
import { t } from "../trpc";
import { createPrompt, createImage, createAudioFromText, createAnalysis, Task  } from "../gateway/chatgpt";

const router = t.router;
const publicProcedure = t.procedure;

const TaskEnumSchema = z.enum(['summarization', 'sentimentAnalysis']).refine((task): task is Task => {
  return ['summarization', 'sentimentAnalysis'].includes(task);
});


export const openaiRouter = router({
  getPrompt: publicProcedure
    .input(
      z
        .string({ required_error: "keyword is required" })
        .max(20, { message: "Must be 20 or fewer characters long" }),
    )
    .query(async (req) => { 
        const keyword = req.input;
        const prompt = await createPrompt(keyword); 
        return {
          prompt: prompt,
        };
    }),
  getImage: publicProcedure
    .input(
      z
        .string({ required_error: "prompt is required" }) 
    )
    .query(async (req) => { 
        const prompt = req.input 
        const imageUrl = await createImage(prompt) 
        return {
          imageUrl: imageUrl
      }
    }),
    getFileAnalysis: publicProcedure 
    .input(
      z
        .object({
          text: z.string(),
          task: TaskEnumSchema
        }) 
    )
    .query(async (req) => { 
        const { text, task } = req.input 
        const analysis = await createAnalysis(text, task) 
        return {
          analysis: analysis
      }
  }),
    getAudioFromText: publicProcedure 
    .input(
      z
        .string({ required_error: "text is required" }) 
    )
    .query(async (req) => { 
        const text = req.input 
        const audio = await createAudioFromText(text) 
        return {
          audio: audio
      }
  })
})

