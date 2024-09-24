"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controller/UserController"));
const ValidationCreate_1 = __importDefault(require("../middleware/ValidationCreate"));
const userRouter = (0, express_1.Router)();
const userController = new UserController_1.default();
userRouter.post('/login', ValidationCreate_1.default.validateLogin, (req, res) => userController.login(req, res));
userRouter.post('/create', ValidationCreate_1.default.validateUser, (req, res) => userController.post(req, res));
userRouter.put('/profile/:id', ValidationCreate_1.default.validateProfile, (req, res) => userController.put(req, res));
exports.default = userRouter;
