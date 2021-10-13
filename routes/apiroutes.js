const { response } = require('express');
const fs = require('fs');
const uuid = require('uuid');
const app = require('express').Router();

// get notes and send to front

app.get('/api/notes', (req, res) => {
  console.log('getting info');
  let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  res.json(data);
  console.log(data);
});

app.post('/api/notes', (req, res) => {
  const note = req.body;
  note.id = uuid;
  let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  data.push(note);
  fs.writeFileSync('./db/db.json', JSON.stringify(data));
  console.log('\nAdded new note to db file');
  res.json(data);
});

app.delete('/api/notes/:id', (req, res) => {
  let noteID = request.params.id.toString();
  let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  const newNoteData = data.filter((note) => note.id.toString() !== noteID);
  fs.writeFileSync('.db/db.json', JSON.stringify(newNoteData));
  res.json(newNoteData);
});

module.exports = app;
