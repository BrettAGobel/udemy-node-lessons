'use strict'

const noteRouter = require('./note/note.router');

const register = app => {
    app.use('/', noteRouter)

    module.exports = register
}