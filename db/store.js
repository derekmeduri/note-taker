//required packages
const util = require("util");
const fs = require("fs");

//required package for unique ids
const uuid = require("uuid");
const { title } = require("process");
const { text, response } = require("express");

//functions to read and write files
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//create class for store
class Store {
  read() {
    //read from db and creates string value from note
    return readFileAsync("dd/db.json", JSON.stringify(note));
  }
  write() {
    //write to db
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
  //parse note data with json
  getNote() {
    return this.read().then((response) => {
      let notes;

      //try catch state to parse json from notes
      //tutoring session with TA
      try {
        notes = [].concat(JSON.parse(response));
        // if theres an error throw empty array
      } catch (error) {
        notes = [];
      }
      return notes;
    });
  }
  //adding new note
  addNote(note) {
    const { title, text } = note;
    //if statement to make sure title and text are not blank
    if (!title || !text) {
      throw new Error(
        "Title and Text cannot be blank. Please create new Note."
      );
    }
    //creating new note with unique id
    const newNote = { title, text, id: uuid() };

    //need to get all notes, add new note, write all notes and return newnote
    return this.getNote()
      .then((response) => [...response, newNote])
      .then((updatedList) => this.write(updatedList))
      .then(() => newNote);
  }
  //deleting note with unique id
  deleteNote(id) {
    return this.getNote()
    .then((response) = response.filter((note) => note.id !== id ))
    .then(() => then write )
  }
}
