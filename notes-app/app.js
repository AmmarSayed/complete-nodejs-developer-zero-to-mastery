const validator = require("validator");
const notes = require("./notes.js");
const chalk = require("chalk");
const yargs = require("yargs");
// Customize yargs version
yargs.version("1.10.0");

// add, remove, list
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body text",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  builder: {
    id: {
      describe: "Note id",
      demandOption: true,
      type: "string",
    },
  },
  describe: "Removes a note",
  handler(argv) {
    notes.removeNote(argv.id);
  },
});

yargs.command({
  command: "read",
  describe: "Read a specific note",
  builder: {
    id: {
      describe: "Note id",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.id);
  },
});

yargs.command({
  command: "list",
  describe: "List your notes",
  handler() {
    notes.listNotes();
  },
});

yargs.parse();
// console.log(yargs.argv);
