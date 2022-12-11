"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const img_utils_1 = __importDefault(require("../utilities/img_utils"));
const sharp_1 = __importDefault(require("sharp"));
//serve the image just after call, check if exists, serve,
const serve = (req, res) => {
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
        //thumb file does not exist
        (0, sharp_1.default)(inputFile)
            .resize(outputWidth, outHeight)
            .toFile(outFile, (err) => {
            if (err) {
                res
                    .status(404)
                    .send("Server error, could not process wanted image:" + err);
            }
            else {
                res.sendFile(outFile, { root: __dirname + "/../.." });
            }
        });
    }
};
const validateInput = (req, res, next) => {
    //destruct filename, width and height
    const { filename, width, height } = req.query;
    //validate user input for filename
    if (!filename) {
        //empty file name, return an error
        res
            .status(404)
            .send("Empty filename,please set a valid filename for the image");
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
