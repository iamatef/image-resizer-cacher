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
const img_utils_1 = __importDefault(require("../utilities/img_utils"));
//import sharp from "sharp";
//serve the image just after call, check if exists, serve,
const serve = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //destruct filename, width and height
    const { filename, width, height } = req.query;
    //resize
    const inputFile = `images/full/${filename}.jpg`;
    const outFile = `images/thumb/${filename}_${width}_${height}.jpg`;
    const outputWidth = parseInt(width);
    const outHeight = parseInt(height);
    if (img_utils_1.default.image_exists(outFile)) {
        res.sendFile(outFile, { root: __dirname + "/../.." });
    }
    else {
        //thumb file does not exist,lets generate a thumbnail using sharp
        //check if full image exists or not, if not, reutn 404 not found
        if (!img_utils_1.default.image_exists(inputFile)) {
            res.status(404).send("Image not found, please set a correct image name");
            return;
        }
        try {
            yield img_utils_1.default.image_resize(inputFile, outFile, outputWidth, outHeight);
            //success lets serve the image
            res.sendFile(outFile, { root: __dirname + "/../.." });
            return;
        }
        catch (error) {
            if (error instanceof Error) {
                res
                    .status(500)
                    .send("Server error, could not process wanted image:" + error.message);
                return;
            }
        }
    }
});
//Middleware to validate if the user added correct filename, width and height
const validateInput = (req, res, next) => {
    //destruct filename, width and height
    const { filename, width, height } = req.query;
    //Main endpoint without used parms, to return 200, lets welcome
    if (!filename && !width && !height) {
        //empty file name, return an error
        res
            .status(200)
            .send("Welcome to image API!. To make use of the API, please set a valid filename for the image,width and height on the form: /api/images?filename={FNAME}&width={WIDTH}&height={HEIGHT}");
        return;
    }
    //validate user input for filename
    if (!filename) {
        //empty file name, return an error
        res
            .status(404)
            .send("ERROR: Empty filename,please set a valid filename for the image,width and height /api/images?filename={FNAME}&width={WIDTH}&height={HEIGHT}");
        return;
    }
    //validate numeric values for width and height
    const outputWidth = parseInt(width);
    const outHeight = parseInt(height);
    if (!(outputWidth > 1 && outHeight > 1)) {
        res
            .status(404)
            .send("Invalid width/height,please set a valid width and height for the image");
        return;
    }
    next();
};
exports.default = { serve, validateInput };
