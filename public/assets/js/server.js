const express = require("express");
const path = require("path");
const PORT = 3001;

const app = express();

//Middleware for parsing json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./routes/apiroutes")(app);
require("./routes/hmtlroutes")(app);

//PORT listener
app.listen(PORT, function () {
  console.log(`Listening on PORT: ${PORT}`);
});
