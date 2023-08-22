//required libraries
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
//creating app with express so we can use express
const app = express();

//Middleware for parsing json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//seting routes for api and html
const apiRouter = require("./routes/apiroutes");
const htmlRouter = require("./routes/htmlroutes");
//calling api and html routes
app.use("/api", apiRouter);
app.use("/", htmlRouter);

//PORT listener
app.listen(PORT, function () {
  console.log(`Listening on PORT: ${PORT}`);
});
