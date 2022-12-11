"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imagesRouter = express_1.default.Router();
//controller
const images_1 = __importDefault(require("../controllers/images"));
//api/images?filename=girl&width=200&height=200 route
imagesRouter.route("/api/images").get(images_1.default.validateInput, images_1.default.serve);
exports.default = imagesRouter;
