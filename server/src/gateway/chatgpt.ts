import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
      throw new Error("undefined ");
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      throw new Error(error.message);
    }
  }
}

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

export type Task = "summarization" | "sentimentAnalysis";

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
      throw new Error("undefined ");
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      throw new Error(error.message);
    }
  }
}

export async function createAudioFromText(text: string): Promise<Buffer> {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    speed: 0.95, 
    input: text,
  });
  const buffer = Buffer.from(await mp3.arrayBuffer());
  return buffer;
}

