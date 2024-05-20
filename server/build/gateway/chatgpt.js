"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAudioFromText = exports.createAnalysis = exports.createImage = exports.createPrompt = void 0;
const openai_1 = __importDefault(require("openai"));
// Initialize the OpenAI client with the provided API key.
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
/**
 * Generates a prompt based on a given keyword using the OpenAI GPT-4o model.
 * @param {string} keyword - The keyword to base the prompt on.
 * @returns {Promise<string>} - The generated prompt.
 * @throws Will throw an error if the prompt generation fails.
 */
function createPrompt(keyword) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const params = {
            messages: [
                {
                    role: "user",
                    content: `Give me a prompt using related to the following keyword: ${keyword}, Just return the prompt, nothing else`,
                },
            ],
            model: "gpt-4o",
        };
        try {
            const chatCompletion = yield openai.chat.completions.create(params);
            const prompt = (_a = chatCompletion.choices.at(0)) === null || _a === void 0 ? void 0 : _a.message.content;
            if (prompt != undefined && prompt != null) {
                return prompt;
            }
            else {
                throw new Error("Prompt is undefined or null.");
            }
        }
        catch (error) {
            if (error.response) {
                throw new Error(error.response.data);
            }
            else {
                throw new Error(error.message);
            }
        }
    });
}
exports.createPrompt = createPrompt;
/**
 * Generates an image based on a given prompt using the OpenAI DALL-E model.
 * @param {string} prompt - The prompt to base the image on.
 * @returns {Promise<string>} - The URL of the generated image.
 * @throws Will throw an error if the image generation fails.
 */
function createImage(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield openai.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
            });
            const imageUrl = response.data[0].url;
            if (imageUrl === undefined) {
                return "";
            }
            else {
                return imageUrl;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createImage = createImage;
/**
 * Performs text analysis (summarization or sentiment analysis) using the OpenAI GPT-4o model.
 * @param {string} text - The text to analyze.
 * @param {Task} task - The type of analysis to perform.
 * @returns {Promise<string>} - The result of the text analysis.
 * @throws Will throw an error if the analysis fails.
 */
function createAnalysis(text, task) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const prompts = {
            summarization: "Summarize the following text:",
            sentimentAnalysis: "Do a sentiment analysis of the following text:",
        };
        const params = {
            messages: [{ role: "user", content: `${prompts[task]} ${text}` }],
            model: "gpt-4o",
        };
        try {
            const chatCompletion = yield openai.chat.completions.create(params);
            const prompt = (_a = chatCompletion.choices.at(0)) === null || _a === void 0 ? void 0 : _a.message.content;
            if (prompt != undefined && prompt != null) {
                return prompt;
            }
            else {
                throw new Error("Prompt is undefined or null.");
            }
        }
        catch (error) {
            if (error.response) {
                throw new Error(error.response.data);
            }
            else {
                throw new Error(error.message);
            }
        }
    });
}
exports.createAnalysis = createAnalysis;
/**
 * Converts a given text to speech using the OpenAI Text-to-Speech model.
 * @param {string} text - The text to convert to speech.
 * @returns {Promise<Buffer>} - The audio buffer of the generated speech.
 */
function createAudioFromText(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const mp3 = yield openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            speed: 0.90,
            input: text,
        });
        const buffer = Buffer.from(yield mp3.arrayBuffer());
        return buffer;
    });
}
exports.createAudioFromText = createAudioFromText;
