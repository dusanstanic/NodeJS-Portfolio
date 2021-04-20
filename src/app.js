const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Header", "Content-Type, Authorization");

  next();
});

app.set("view engine", "ejs");

console.log(path.join(__dirname, "public"));
console.log(path.join(__dirname, "public", "images"));

app.use(
  express.static(path.join(__dirname, ".netlify/functions/app/images/public"))
);
// app.use(
//   express.static(
//     "/images",
//     express.static(
//       path.join(__dirname, "/.netlify/functions/app", "public", "images")
//     )
//   )
// );

const rootDir = require("./util/path");

const errorController = require("./controllers/error");
const projectRoutes = require("./routes/project");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(projectRoutes);
app.use("/.netlify/functions/app", projectRoutes);
app.use(errorController.get404);

app.listen(3000, function () {
  console.log("info", "Server is running at port : " + 3000);
});

module.exports.handler = serverless(app);
