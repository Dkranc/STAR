import genRoutes from "./routes/generalRoutes/genApi.js";
import testRoutes from "./routes/testRoutes/testsApi.js";
import express from "express";
import cors from "cors";


//get server from express
const app = express();
//middleware
app.use(express.json());
app.use(cors());
app.use("/api/general", genRoutes);
app.use("/api/tests", testRoutes);


//start sever on port 8080
app.listen(8080, () => {
  console.log("server connected");
});
