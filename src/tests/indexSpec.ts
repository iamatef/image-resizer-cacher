//supertest API endpoint test
import supertest from "supertest";
import app from "../index";

//Endpoint testing...
describe("GET Endpoints /", function () {
  const request = supertest;

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
});
