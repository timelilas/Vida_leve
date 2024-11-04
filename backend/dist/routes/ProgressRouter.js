"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProgressController_1 = __importDefault(require("../controller/ProgressController"));
const ValidationProgress_1 = __importDefault(require("../middleware/ValidationProgress"));
const progressRouter = (0, express_1.Router)();
const progressController = new ProgressController_1.default();
progressRouter.post('/:id', ValidationProgress_1.default.validateProgress, (req, res) => progressController.post(req, res));
exports.default = progressRouter;
