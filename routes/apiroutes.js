const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// get notes and send to front

notes.get('/', (req, res) => {
  readFromFile('.db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
    const note = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(note, './db/db.json');
    res.json('Successfully Added Note');
  } else {
    res.error('Oops, Something Went Wrong');
  }
});

notes.delete('api/notes/:id', (req, res) => {
  try {
    notes = fs.readFile('/db/db.json', 'utf8');
    notes = JSON.parse(notes);
    notes = notes.filter(function (dataNote) {
      return dataNote.id !== req.params.id;
    });
    notes = JSON.stringify(notes);
    fs.writeFile('/db/db.json', notes, 'utf-8', (err) => {
      if (err) throw err;
    });
    res.send(JSON.parse(notes));
  } catch (err) {
    throw err;
  }
});

module.exports = notes;
