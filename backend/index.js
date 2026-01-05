const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const swagger = require("swagger-generator-express");
const morgan = require("morgan");
var port = process.env.PORT || 3333;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  morgan("dev", {
    skip: (req, res) => {
      return req.originalUrl.startsWith("/swagger");
    },
  })
);
app.use(cors());

mongoose.connect("mongodb://localhost/testApi");

var db = mongoose.connection;

if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

const indexRouter = require("./routes/index");
app.use("/api", indexRouter);

const options = {
  title: "Pepovo testovací API",
  version: "1.0.0",
  host: "localhost:3333",
  basePath: "/",
  schemes: ["http", "https"],
};

app.listen(port, function () {
  console.log("Running TestApi on port " + port);
});

/**
 * serveSwagger must be called after defining your router.
 * @param app Express object
 * @param endPoint Swagger path on which swagger UI display
 * @param options Swagget Options.
 * @param path.routePath path to folder in which routes files defined.
 * @param path.requestModelPath Optional parameter which is path to folder in which requestModel defined, if not given request params will not display on swagger documentation.
 * @param path.responseModelPath Optional parameter which is path to folder in which responseModel defined, if not given response objects will not display on swagger documentation.
 */
swagger.serveSwagger(app, "/swagger", options, {
  routePath: "./backend/routes",
  requestModelPath: "./backend/requestModel",
  responseModelPath: "./backend/responseModel",
});
