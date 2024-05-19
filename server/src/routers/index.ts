import { t } from "../trpc";
import { openaiRouter } from "./chatgpt.router";

const router = t.router;

export const appRouter = router({
  openai: openaiRouter 
});
