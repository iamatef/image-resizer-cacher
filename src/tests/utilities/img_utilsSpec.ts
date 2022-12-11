//supertest API endpoint test
import imgUtils from "../../utilities/img_utils";

//Image exists function testing...
describe("Image exists function to return true for existing file and false for non existing", function () {
  it("Existing file to return true", async () => {
    const exists = imgUtils.image_exists("images/full/girl.jpg");
    expect(exists).toBe(true);
  });

  it("Not Existing file to return false", async () => {
    const exists = imgUtils.image_exists("images/full/udacity.jpg");
    expect(exists).toBe(false);
  });
});
