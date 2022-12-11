//supertest API endpoint test
import supertest from "supertest";
import app from "../index";
import sharp from "sharp";

//Endpoint testing...
describe("GET Endpoints /", function () {
  const request = supertest;

  it("Main  Endpoint 200 Welcome HomePage", async () => {
    const response = await request(app).get("/api/images");

    expect(response.status).toBe(200);
  });

  it("Main  Endpoint 200 Correct image serving", async () => {
    const response = await request(app).get(
      "/api/images?filename=girl&width=200&height=200"
    );

    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toBe("image/jpeg");
  });

  it("Main  Endpoint 404 not existing image serving", async () => {
    const response = await request(app).get(
      "/api/images?filename=fake&width=200&height=200"
    );

    expect(response.status).toBe(404);
  });

  it("Main  Endpoint 500 SERVER ERR for defected image file passed to sharp", async () => {
    const response = await request(app).get(
      "/api/images?filename=defected&width=200&height=200"
    );

    expect(response.status).toBe(500);
  });
});

//3rd Party sharp barepone testing
describe("Testing 3rd party sharp directly /", function () {
  const inputFileDefect = "images/full/defected.jpg";
  const inputFileCorrect = "images/full/girl.jpg";
  const outFile = "images/thumb/girl_203_203.jpg";
  const outputWidth = 203;
  const outHeight = 203;

  it("Existing correct file to be resized and promise resolved", async () => {
    expectAsync(
      await sharp(inputFileCorrect)
        .resize(outputWidth, outHeight)
        .toFile(outFile)
    ).toBeResolved;
  });

  it("Existing defected file to throw an error", async () => {
    expect(function () {
      sharp(inputFileDefect).resize(outputWidth, outHeight).toFile(outFile);
    }).toThrowError;
  });
});
