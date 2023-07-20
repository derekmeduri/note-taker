//required libraries
const router = require("express").Router;

//GET Request for the notes html file
router.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
//* selects all other routes
router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//exporting router
module.exports = router;
