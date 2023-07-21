//required packages
const util = require("util");
const fs = require("fs");

//required package for unique ids
const { v4: as uuidv4 } = require("uuid");
const { title } = require("process");


//functions to read and write files
//tutoring session with TA sam cordova
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//create class for store
class Store {
  read() {
    //read from db and creates string value from note
    return readFileAsync("dd/db.json", JSON.stringify(note));
  }
  write(note) {
    //write to db
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
  //parse note data with json
  getNote() {
    return this.read().then((notes) => {
      //seeting parsednotes var so we can store parsed data
      let parsedNotes;

      //try catch state to parse json from notes
      //tutoring session with TA
      try {
        parsedNotes = [].concat(JSON.parse(notes));
        // if theres an error throw empty array
      } catch (error) {
        parsedNotes = [];
      }
      return parsedNotes;
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
    const newNote = { title, text, id: uuidv4() };

    //need to get all notes, add new note, write all notes and return newnote
    return this.getNote()
      .then((notes) => [...notes, newNote])
      .then((updatedList) => this.write(updatedList))
      .then(() => newNote);
  }
  //deleting note with unique id
  //tutoring sessionw with TA sam cordova
  deleteNote(id) {
    return this.getNote()
      .then((response = response.filter((note) => note.id !== id)))
      .then(() => this.write());
  }
}

//exporting store class to be used
module.exports = new Store();
