//IMPORTS
const router = require('express').Router();
const notesPage = require('./APIroutes');
router.use('/notes', notesPage);
//EXPORTS
module.exports = router;