//required packages
const util = require("util");
const fs = require("fs");

//required package for unique ids
const uuid = require("uuid");

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
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
}
