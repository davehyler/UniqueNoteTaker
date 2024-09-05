//IMPORTS
const notes = require('express').Router();
const fs = require('fs');

// TODO: * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
notes.get('/', (req, res) => 
{
  fs.readFile('./db/db.json', 'utf8', (err, data) => 
  {
    const prevNotes = JSON.parse(data);
    res.send(prevNotes);
  });
});

// TODO: * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
notes.post('/', (req, res) => 
{
  fs.readFile('./db/db.json', 'utf8', (err, data) => 
  {
    const prevNotes = JSON.parse(data);
    prevNotes.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(prevNotes), (err, data) =>{});
  });
});

// TODO: * `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
notes.delete('/:id', (req, res) => 
{
  fs.readFile('./db/db.json', 'utf8', (err, data) => 
  {
    const { id } = req.params;
    const prevNotes = JSON.parse(data);
    const revised = prevNotes.filter((note) => note.title != id);
    fs.writeFile('./db/db.json', JSON.stringify(revised), (err, data) => {});
  });
});
//EXPORTS
module.exports = notes;