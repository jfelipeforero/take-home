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
Object.defineProperty(exports, "__esModule", { value: true });
exports.openaiRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
const chatgpt_1 = require("../gateway/chatgpt");
const router = trpc_1.t.router;
const publicProcedure = trpc_1.t.procedure;
const TaskEnumSchema = zod_1.z.enum(['summarization', 'sentimentAnalysis']).refine((task) => {
    return ['summarization', 'sentimentAnalysis'].includes(task);
});
exports.openaiRouter = router({
    getPrompt: publicProcedure
        .input(zod_1.z
        .string({ required_error: "keyword is required" })
        .max(20, { message: "Must be 20 or fewer characters long" }))
        .query((req) => __awaiter(void 0, void 0, void 0, function* () {
        const keyword = req.input;
        const prompt = yield (0, chatgpt_1.createPrompt)(keyword);
        return {
            prompt: prompt,
        };
    })),
    getImage: publicProcedure
        .input(zod_1.z
        .string({ required_error: "prompt is required" }))
        .query((req) => __awaiter(void 0, void 0, void 0, function* () {
        const prompt = req.input;
        const imageUrl = yield (0, chatgpt_1.createImage)(prompt);
        return {
            imageUrl: imageUrl
        };
    })),
    getFileAnalysis: publicProcedure
        .input(zod_1.z
        .object({
        text: zod_1.z.string(),
        task: TaskEnumSchema
    }))
        .query((req) => __awaiter(void 0, void 0, void 0, function* () {
        const { text, task } = req.input;
        const analysis = yield (0, chatgpt_1.createAnalysis)(text, task);
        return {
            analysis: analysis
        };
    })),
    getAudioFromText: publicProcedure
        .input(zod_1.z
        .string({ required_error: "text is required" }))
        .query((req) => __awaiter(void 0, void 0, void 0, function* () {
        const text = req.input;
        const audio = yield (0, chatgpt_1.createAudioFromText)(text);
        return {
            audio: audio
        };
    }))
});
