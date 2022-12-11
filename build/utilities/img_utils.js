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
//check if image file exists, return true if exists, false if not
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
//function to check if image exists or not
const image_exists = (path) => {
    if (fs_1.default.existsSync(path)) {
        return true;
    }
    else {
        return false;
    }
};
//function utility to resize an image using sharp
const image_resize = (inputFile, outFile, outputWidth, outHeight) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(inputFile).resize(outputWidth, outHeight).toFile(outFile);
        return true;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.default = { image_exists, image_resize };
