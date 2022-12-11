//check if image file exists, return true if exists, false if not
import fs from "fs";
const image_exists = (path: string): boolean => {
  if (fs.existsSync(path)) {
    return true;
  } else {
    return false;
  }
};

export default { image_exists };
