const fs = require("fs");
const nanoid = require("nanoid");
const chalk = require("chalk");

const getNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notesData.json");
    const data = JSON.parse(dataBuffer.toString());
    return data;
  } catch (e) {
    return [];
  }
};

const addNotes = (title, body) => {
  // getting Existing notes
  const notes = getNotes();

  // checking if the title already exists
  const duplicates = notes.filter((note) => note.title === title);

  if (duplicates.length > 0) {
    console.log(chalk.red.inverse("Note title already exists"));
    return;
  }

  // adding a new note to it
  notes.push({ id: nanoid(), title, body });
  saveNotes(notes);
};

const removeNote = (id) => {
  const notes = getNotes();
  const checking = notes.filter((note) => note.id === id);
  if (checking.length === 0) {
    console.log(chalk.red.inverse("Doesn't exist"));
    return;
  }

  // removing the note
  const filteredNotes = notes.filter((note) => note.id !== id);
  saveNotes(filteredNotes);
  console.log(chalk.green.bold.inverse("Notes removed"));
};

const saveNotes = (arr) =>
  fs.writeFileSync("notesData.json", JSON.stringify(arr));

const listNotes = () => {
  console.log(chalk.green("Here are your notes"));
  const notes = getNotes();
  notes.forEach((note) => console.log({ id: note.id, title: note.title }));
};

const readNote = (id) => {
  const notes = getNotes();

  const note = notes.find((note) => note.id === id);
  if (!note) {
    console.log(chalk.red.inverse("No note is found"));
    return;
  }
  console.log(chalk.green("Here's your Note: "));
  console.log(note);
};
module.exports = { readNote, listNotes, addNotes, removeNote };
