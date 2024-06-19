// TODO "Import and initialize express, path, and fs
const express = require('express');
const path = require('path');
const fs = require('fs');
// declare constant variable to use express function
const app = express();
//see Unit 11: Express Student activity 16 regarding "Unique User IDs" //can also import uuid via node
const uid = () => 
{
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
};
// creating "environmental" (env) port to view on local host @ 3042 (see listener at end of page)

// "Middleware" statement // see unit 11 activity 23-24 for more info
app.use(express.json());

// Public directory for "static" files (non changing files)
app.use(express.static('public'));

const PORT = process.env.PORT || 3042;

//The following HTML routes should be created:
//GET * should return the index.html file.
app.get('/', (req, res) => 
{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//The following HTML routes should be created:
//GET /notes should return the notes.html file.
app.get('/notes', (req, res) => 
{
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

//connect to database (db.json) and pull previous note entries
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json(
                { 
                error: 'Server unavailable' 
                });
                return;
                }
        res.json(JSON.parse(data));
    });
});

// Begin Note Taking App
// The following API routes should be created:
// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.post('/api/notes', (req, res) => {
    //use "newNote" variable already predefined in our starter code
    const newNote = req.body;
    // Pull existing from database (see db.json)
    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json(
                { 
                error: 'Server unavailable' 
                });
                return;
                }
        const notes = JSON.parse(data);
        // Unique, and random, Identifier (see math function below uuid function) when writing new note
        newNote.id = uid();
