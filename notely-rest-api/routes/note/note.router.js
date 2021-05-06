'use strict'
const noteController = require('../../controllers/note.controller')
const express = require('express')
const router = express.Router();

router.get('/api/check-user', noteController.checkUser);

router.get('/SignUp', noteController.signUpRedirect);

router.get('/SignIn', noteController.signInRedirect);

router.post('/api/user', noteController.signUp);

router.post('/api/login', noteController.login);

router.get('/api/note', noteController.getAllNotes);

router.post('/api/note', noteController.createNote);

router.get('/api/note/:id', noteController.getNote)

router.put('/api/note', noteController.editNote);

router.delete('/api/note/:id', noteController.deleteNote);

module.exports = router;