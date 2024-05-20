import { t } from "../trpc";
import { openaiRouter } from "./openai.router";

const router = t.router;

export const appRouter = router({
  openai: openaiRouter 
});
