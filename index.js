const http = require("http");
const express = require("express");
const chalk = require("chalk");
const fs = require("fs/promises");
const {
  addNote,
  getNotes,
  deleteNote,
  editNotes,
} = require("./nodes.controller");
const path = require("path");
const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");
app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});
app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});
app.delete("/:id", async (req, res) => {
  await deleteNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});
app.put("/:cont", async (req, res) => {
  console.log(req.params.cont.split("+"));
  await editNotes(req.params.cont.split("+"));
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});
//

app.listen(port, () => {
  console.log(chalk.green("server has been started"));
});
