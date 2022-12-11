import express from "express";
import imgUtils from "../utilities/img_utils";
import sharp from "sharp";

//serve the image just after call, check if exists, serve,
const serve = (req: express.Request, res: express.Response): void => {
  //destruct filename, width and height
  const { filename, width, height } = req.query;

  //resize
  const inputFile = `images/full/${filename}.jpg`;
  const outFile = `images/thumb/${filename}_${width}_${height}.jpg`;
  const outputWidth = parseInt(width as string);
  const outHeight = parseInt(height as string);

  if (imgUtils.image_exists(outFile)) {
    res.sendFile(outFile, { root: __dirname + "/../.." });
  } else {
    //thumb file does not exist

    sharp(inputFile)
      .resize(outputWidth, outHeight)
      .toFile(outFile, (err: Error) => {
        if (err) {
          res
            .status(404)
            .send("Server error, could not process wanted image:" + err);
        } else {
          res.sendFile(outFile, { root: __dirname + "/../.." });
        }
      });
  }
};

const validateInput = (
  req: express.Request,
  res: express.Response,
  next: () => void
): void => {
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
  const outputWidth = parseInt(width as string);
  const outHeight = parseInt(height as string);

  if (!(outputWidth > 1 && outHeight > 1)) {
    res
      .status(404)
      .send(
        "Invalid width/height,please set a valid width and height for the image"
      );
    return;
  }

  next();
};

export default { serve, validateInput };
