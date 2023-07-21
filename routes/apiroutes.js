//required libraries
const router = require("express").Router();
const store = require("../db/store");

//API GET request to get notes from db
router.get("/notes", (req, res) => {
  store
    .getNote()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((error) => res.status(500).json(error));
});

//API POST reuqest to add note to db
router.post("/notes", (req, res) => {
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((error) => res.status(500).json(error));
});

//API DELETE request
router.delete("/notes/:id", (req, res) => {
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((error) => res.status(500).json(error));
});

//exporting router to server
module.exports = router;
