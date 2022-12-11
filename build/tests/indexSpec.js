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
//supertest API endpoint test
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const sharp_1 = __importDefault(require("sharp"));
//Endpoint testing...
describe("GET Endpoints /", function () {
    const request = supertest_1.default;
    it("Main  Endpoint 200 Welcome HomePage", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default).get("/api/images");
        expect(response.status).toBe(200);
    }));
    it("Main  Endpoint 200 Correct image serving", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default).get("/api/images?filename=girl&width=200&height=200");
        expect(response.status).toBe(200);
        expect(response.header["content-type"]).toBe("image/jpeg");
    }));
    it("Main  Endpoint 404 not existing image serving", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default).get("/api/images?filename=fake&width=200&height=200");
        expect(response.status).toBe(404);
    }));
    it("Main  Endpoint 500 SERVER ERR for defected image file passed to sharp", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default).get("/api/images?filename=defected&width=200&height=200");
        expect(response.status).toBe(500);
    }));
});
//3rd Party sharp barepone testing
describe("Testing 3rd party sharp directly /", function () {
    const inputFileDefect = "images/full/defected.jpg";
    const inputFileCorrect = "images/full/girl.jpg";
    const outFile = "images/thumb/girl_203_203.jpg";
    const outputWidth = 203;
    const outHeight = 203;
    it("Existing correct file to be resized and promise resolved", () => __awaiter(this, void 0, void 0, function* () {
        expectAsync(yield (0, sharp_1.default)(inputFileCorrect)
            .resize(outputWidth, outHeight)
            .toFile(outFile)).toBeResolved;
    }));
    it("Existing defected file to throw an error", () => __awaiter(this, void 0, void 0, function* () {
        expect(function () {
            (0, sharp_1.default)(inputFileDefect).resize(outputWidth, outHeight).toFile(outFile);
        }).toThrowError;
    }));
});
