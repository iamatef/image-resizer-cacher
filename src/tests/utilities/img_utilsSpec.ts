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

//image resizing function testing
describe("Image resizing utility to return true for correct sizing and throw error for resize error", function () {
  it("Existing correct file to be resized return true", async () => {
    const resize = await imgUtils.image_resize(
      "images/full/girl.jpg",
      "images/thumb/girl_201_201.jpg",
      201,
      201
    );
    expect(resize).toBe(true);
  });

  it("Existing defected file to be promise rejected", async () => {
    expectAsync(
      imgUtils.image_resize(
        "images/full/defected.jpg",
        "images/thumb/girl_201_201.jpg",
        201,
        201
      )
    ).toBeRejected;
  });
});
