import { z } from "zod";
import { t } from "../trpc";
import { createPrompt, createImage, createAudioFromText, createAnalysis, Task } from "../gateway/openai";

// Defining the router and procedure from tRPC
const router = t.router;
const publicProcedure = t.procedure;

// Defining a schema for the task enumeration with a refinement to ensure the task is valid
const TaskEnumSchema = z.enum(['summarization', 'sentimentAnalysis']).refine((task): task is Task => {
  return ['summarization', 'sentimentAnalysis'].includes(task);
});

// Exporting the openaiRouter object with defined procedures
export const openaiRouter = router({
  // Procedure to get a prompt from a keyword
  getPrompt: publicProcedure
    .input(
      // Input validation schema for the keyword, ensuring it is a string and has a max length of 20 characters
      z
        .string({ required_error: "keyword is required" })
        .max(20, { message: "Must be 20 or fewer characters long" }),
    )
    .query(async (req) => { 
        const keyword = req.input; // Extracting the keyword from the request
        const prompt = await createPrompt(keyword); // Generating a prompt using the createPrompt function
        return {
          prompt: prompt, // Returning the generated prompt
        };
    }),
  
  // Procedure to get an image from a prompt
  getImage: publicProcedure
    .input(
      // Input validation schema for the prompt, ensuring it is a string
      z
        .string({ required_error: "prompt is required" }) 
    )
    .query(async (req) => { 
        const prompt = req.input; // Extracting the prompt from the request
        const imageUrl = await createImage(prompt); // Generating an image URL using the createImage function
        return {
          imageUrl: imageUrl // Returning the generated image URL
      }
    }),

  // Procedure to get a file analysis from text and a specified task
  getFileAnalysis: publicProcedure 
    .input(
      // Input validation schema for the text and task, ensuring text is a string and task is one of the allowed enum values
      z
        .object({
          text: z.string(),
          task: TaskEnumSchema
        }) 
    )
    .query(async (req) => { 
        const { text, task } = req.input; // Extracting the text and task from the request
        const analysis = await createAnalysis(text, task); // Performing the analysis using the createAnalysis function
        return {
          analysis: analysis // Returning the analysis result
      }
  }),

  // Procedure to get audio from text
  getAudioFromText: publicProcedure 
    .input(
      // Input validation schema for the text, ensuring it is a string
      z
        .string({ required_error: "text is required" }) 
    )
    .query(async (req) => { 
        const text = req.input; // Extracting the text from the request
        const audio = await createAudioFromText(text); // Generating audio from the text using the createAudioFromText function
        return {
          audio: audio // Returning the generated audio
      }
  })
});
