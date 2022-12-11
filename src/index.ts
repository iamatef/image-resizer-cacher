import express from "express"; //express import for building a server
import imagesRouter from "./routes/images"; //images route

//ini express
const app = express();
const port = 3000;

//api/images route set
app.use("/", imagesRouter);

//app listining to serve traffic
app.listen(port, (): void => {
  console.log(`Example app listening on port ${port}`);
});

//export app for unittesting endpoint supertest
export default app;
