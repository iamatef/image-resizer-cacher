import express from "express";

const imagesRouter = express.Router();

//controller
import images from "../controllers/images";

//api/images?filename=girl&width=200&height=200 route
imagesRouter.route("/api/images").get(images.validateInput, images.serve);

export default imagesRouter;
