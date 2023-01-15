const ns = require('express').Router();
const { v4: uuidv4 } = require('uuid');
// const fs = require('fs');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving notes
ns.get('/api/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes
ns.post('/api/notes', (req, res) => {
  const { title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

// ns.delete('/api/notes/:id', (req, res) =>
//   readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
// );

module.exports = ns;