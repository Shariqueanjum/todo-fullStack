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
const index_js_1 = require("../middleware/index.js");
const todo_js_1 = __importDefault(require("../db/models/todo.js"));
const router = express_1.default.Router();
router.post('/todos', index_js_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const done = false;
        const userId = req.headers["userId"];
        const newTodo = yield new todo_js_1.default({ title, description, done, userId });
        yield newTodo.save();
        if (newTodo)
            res.status(201).json(newTodo);
        else
            res.status(500).json({ msg: "something went wrong" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "internal server error" });
    }
}));
router.get('/todos', index_js_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.headers["userId"];
        const data = yield todo_js_1.default.find({ userId });
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(500).json({ msg: "something went wrong" });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Something went wrong" });
    }
}));
router.patch('/todos/:todoId/done', index_js_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoId } = req.params;
        const userId = req.headers["userId"];
        const data = yield todo_js_1.default.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true });
        if (data)
            res.status(200).json(data);
        else
            res.status(401).json({ msg: "something went wrong" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ msg: "something went wrong" });
    }
}));
exports.default = router;
