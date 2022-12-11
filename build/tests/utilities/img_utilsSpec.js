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
const img_utils_1 = __importDefault(require("../../utilities/img_utils"));
//Image exists function testing...
describe("Image exists function to return true for existing file and false for non existing", function () {
    it("Existing file to return true", () => __awaiter(this, void 0, void 0, function* () {
        const exists = img_utils_1.default.image_exists("images/full/girl.jpg");
        expect(exists).toBe(true);
    }));
    it("Not Existing file to return false", () => __awaiter(this, void 0, void 0, function* () {
        const exists = img_utils_1.default.image_exists("images/full/udacity.jpg");
        expect(exists).toBe(false);
    }));
});
