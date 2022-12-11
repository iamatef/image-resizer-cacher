//check if image file exists, return true if exists, false if not
import fs from "fs";
import sharp from "sharp";

//function to check if image exists or not
const image_exists = (path: string): boolean => {
  if (fs.existsSync(path)) {
    return true;
  } else {
    return false;
  }
};

//function utility to resize an image using sharp
const image_resize = async (
  inputFile: string,
  outFile: string,
  outputWidth: number,
  outHeight: number
): Promise<boolean> => {
  try {
    await sharp(inputFile).resize(outputWidth, outHeight).toFile(outFile);

    return true;
  } catch (error) {
    throw new Error(error as string);
  }
};

export default { image_exists, image_resize };
