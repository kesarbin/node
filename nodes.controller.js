const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green.inverse("Note added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("List Of Notes"));
  notes.forEach((note) => {
    console.log(`${chalk.blue(note.id)} ${chalk.blue(note.title)}`);
  });
}

async function editNotes([noteId, newTitle]) {
  const notes = await getNotes();
  const noteIndex = notes.findIndex((note) => {
    return note.id === noteId.toString();
  });
  notes[noteIndex] = { title: newTitle, id: noteId };
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.blue("note edited"));
}

async function deleteNote(idToDelete) {
  const notes = await getNotes();
  notes.splice(
    notes.findIndex((note) => {
      return note.id === idToDelete.toString();
    }),
    1
  );
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.red("note removed"));
}

module.exports = {
  addNote,
  printNotes,
  deleteNote,
  getNotes,
  editNotes,
};
