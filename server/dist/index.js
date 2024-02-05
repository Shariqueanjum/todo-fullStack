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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connect_js_1 = __importDefault(require("./db/connect.js"));
const auth_js_1 = __importDefault(require("./routes/auth.js"));
const todo_js_1 = __importDefault(require("./routes/todo.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const port = 3000;
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
    exposedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
app.use("/user", auth_js_1.default);
app.use("/todo", todo_js_1.default);
app.get("/", (req, res) => {
    res.send("hiiii");
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.MONGODB_URL === undefined)
            throw new Error();
        (0, connect_js_1.default)(process.env.MONGODB_URL);
        app.listen(port, () => console.log(`Server started on port ${port}`));
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
