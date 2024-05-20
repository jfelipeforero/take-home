"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("../trpc");
const chatgpt_router_1 = require("./chatgpt.router");
const router = trpc_1.t.router;
exports.appRouter = router({
    openai: chatgpt_router_1.openaiRouter
});
