const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db');
const { v4: uuidv4 } = require('uuid');
let uuid = uuidv4();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app
  .route('/api/notes')
  .get((req, res) => {
    res.json(db);
  })
  .post((req, res) => {
    const dbFilePath = path.join(__dirname, '/db/db.json');
    const notes = req.body;
    notes.id = uuidv4();
    db.push(notes);
    fs.writeFile(dbFilePath, JSON.stringify(db), (err) => {
      if (err) {
        return err;
      }
    });
    res.json(notes);
  });

app.delete('/api/notes/:id', function (req, res) {
  fs.readFile('./db/db.json', 'utf8', function (err, data) {
    const db = JSON.parse(data);
    fs.writeFile(
      './db/db.json',
      JSON.stringify(db.filter((note) => note.id !== req.params.id)),
      () => res.send('Success!')
    );
  });
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
