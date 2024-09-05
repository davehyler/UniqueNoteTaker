//IMPORTS:
const express = require('express');
const path = require('path');
const api = require('./routes/HTMLroutes.js');
const PORT = 3001;
const app = express();

// Middleware from previous module
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

// TODO: '* `GET /notes` should return the `notes.html` file.'
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// TODO: * `GET *` should return the `index.html` file.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//TODO: Link in console to launch webpage (public fronted)
app.listen(PORT, () =>
  console.log('App listening at http://localhost:',{PORT})
);
