"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.createContext = void 0;
const server_1 = require("@trpc/server");
//import superjson from "superjson";
const zod_1 = require("zod");
const createContext = ({ req, res, }) => ({}); // no context
exports.createContext = createContext;
exports.t = server_1.initTRPC.context().create({
    //transformer: superjson,
    errorFormatter({ shape, error }) {
        return Object.assign(Object.assign({}, shape), { data: Object.assign(Object.assign({}, shape.data), { zodError: error.cause instanceof zod_1.ZodError ? error.cause.flatten() : null }) });
    },
});
