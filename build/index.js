"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //express import for building a server
const images_1 = __importDefault(require("./routes/images")); //images route
//ini express
const app = (0, express_1.default)();
const port = 3000;
//api/images route set
app.use("/", images_1.default);
//app listining to serve traffic
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//export app for unittesting endpoint supertest
exports.default = app;
