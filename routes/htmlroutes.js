//required libraries
const express = require("express");
const router = express.Router();
const path = require("path");

//const express = require("express");

//GET Request for the notes html file
router.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});
//* selects all other routes
router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//exporting router
module.exports = router;
