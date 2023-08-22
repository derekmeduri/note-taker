//required libraries
const express = require("express");
const router = express.Router();
const store = require("../db/store");
const { v4: uuidv4 } = require("uuid");
const { json } = require("stream/consumers");

//API GET request to get notes from db
router.get("/api/notes", (req, res) => {
  fstat.readFile(
    path.join(__dirname, "../db/db.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.error(err);
        return res
          .status(400)
          .json({ error: "Unable to get notes. Please try again!" });
      }
      const notes = JSON.parse(data);
      res.json(notes);
    }
  );
});

//API POST reuqest to add note to db
router.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  const newNote = {
    id: uuidv4(),
    title: title,
    text: text,
  };

  fstat.readFile(
    path.joim(__dirname, "../db/db.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.error(err);
        return res
          .status(400)
          .json({ error: "Unable to get notes. Please try again!" });
      }
      const notes = JSON.parse(data);
      notes.push(newNote);

      fstat.writeFile(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(notes),
        (err) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Could not save note at this time" });
          }
          res.json(newNote);
        }
      );
    }
  );
});

//API DELETE request
router.delete("/api/notes/:id", (req, res) => {
  const deleteId = req.params.id;
  fstat.readFile(path.join(__dirname, "../db/.json"), "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(400)
        .json({ error: "Unable to get notes. Please try again!" });
    }
    const notes = JSON.parse(data);
    const newNotes = notes.filter((db) => db.id !== deleteId);
    if (notes.length === newNotes.length) {
      return res
        .status(404)
        .json({ error: "Unable to get note. Please try again!" });
    }

    fstat.writeFile(
      path.join(__dirname, "..db/db.json"),
      JSON.stringify(newNotes),
      (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Failed to delete note. Please try again." });
        }
        res.status(200).json({ message: "Note successfully deleted!" });
      }
    );
  });
});

//exporting router to server
module.exports = router;
