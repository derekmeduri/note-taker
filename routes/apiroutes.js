//required libraries
const router = require("express").Router();
const store = require("../db/store");

//API GET request to get notes from db
router.get("/notes", (req, res) => {
  store;
});

//API POST reuqest to add note to db
router.post("/notes", (req, res) => {
  store;
});

//API DELETE request
router.delete("", (req, res) => {
  store;
});

//exporting router to
module.exports = router;
