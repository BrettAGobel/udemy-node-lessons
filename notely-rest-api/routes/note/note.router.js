'use strict'
const noteController = require('../../controllers/note.controller')
const express = require('express')
const  router = express.Router();


router.get('/api/note', noteController.getAllNotes);

router.post('/api/note', noteController.createNote);

router.get('/api/note/:id', noteController.getNote)

router.put('/api/note', noteController.editNote);

router.delete('/api/note/:id', noteController.deleteNote);

module.exports = router;