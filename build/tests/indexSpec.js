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
//Endpoint testing...
describe("GET Endpoints /", function () {
    const request = supertest_1.default;
    it("Main  Endpoint 200 Correct image serving", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default).get("/api/images?filename=girl&width=200&height=200");
        expect(response.status).toBe(200);
        expect(response.header["content-type"]).toBe("image/jpeg");
    }));
    it("Main  Endpoint 404 not existing image serving", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default).get("/api/images?filename=fake&width=200&height=200");
        expect(response.status).toBe(404);
    }));
});
