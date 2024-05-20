import OpenAI from "openai";

// Initialize the OpenAI client with the provided API key.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates a prompt based on a given keyword using the OpenAI GPT-4o model.
 * @param {string} keyword - The keyword to base the prompt on.
 * @returns {Promise<string>} - The generated prompt.
 * @throws Will throw an error if the prompt generation fails.
 */
export async function createPrompt(
  keyword: string
): Promise<OpenAI.Chat.Completions.ChatCompletionMessage["content"]> {
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      {
        role: "user",
        content: `Give me a prompt using related to the following keyword: ${keyword}, Just return the prompt, nothing else`,
      },
    ],
    model: "gpt-4o",
  };

  try {
    const chatCompletion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);
    const prompt = chatCompletion.choices.at(0)?.message.content;
    if (prompt != undefined && prompt != null) {
      return prompt;
    } else {
      throw new Error("Prompt is undefined or null.");
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      throw new Error(error.message);
    }
  }
}

/**
 * Generates an image based on a given prompt using the OpenAI DALL-E model.
 * @param {string} prompt - The prompt to base the image on.
 * @returns {Promise<string>} - The URL of the generated image.
 * @throws Will throw an error if the image generation fails.
 */
export async function createImage(prompt: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    const imageUrl = response.data[0].url;
    if (imageUrl === undefined) {
      return "";
    } else {
      return imageUrl;
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

// Define the types of tasks that can be performed for text analysis.
export type Task = "summarization" | "sentimentAnalysis";

/**
 * Performs text analysis (summarization or sentiment analysis) using the OpenAI GPT-4o model.
 * @param {string} text - The text to analyze.
 * @param {Task} task - The type of analysis to perform.
 * @returns {Promise<string>} - The result of the text analysis.
 * @throws Will throw an error if the analysis fails.
 */
export async function createAnalysis(
  text: string,
  task: Task
): Promise<OpenAI.Chat.Completions.ChatCompletionMessage["content"]> {
  const prompts: Record<Task, string> = {
    summarization: "Summarize the following text:",
    sentimentAnalysis: "Do a sentiment analysis of the following text:",
  };

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [{ role: "user", content: `${prompts[task]} ${text}` }],
    model: "gpt-4o",
  };
  try {
    const chatCompletion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);
    const prompt = chatCompletion.choices.at(0)?.message.content;
    if (prompt != undefined && prompt != null) {
      return prompt;
    } else {
      throw new Error("Prompt is undefined or null.");
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      throw new Error(error.message);
    }
  }
}

/**
 * Converts a given text to speech using the OpenAI Text-to-Speech model.
 * @param {string} text - The text to convert to speech.
 * @returns {Promise<Buffer>} - The audio buffer of the generated speech.
 */
export async function createAudioFromText(text: string): Promise<Buffer> {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    speed: 0.90,
    input: text,
  });
  const buffer = Buffer.from(await mp3.arrayBuffer());
  return buffer;
}

