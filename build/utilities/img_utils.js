"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//check if image file exists, return true if exists, false if not
const fs_1 = __importDefault(require("fs"));
const image_exists = (path) => {
    if (fs_1.default.existsSync(path)) {
        return true;
    }
    else {
        return false;
    }
};
exports.default = { image_exists };
