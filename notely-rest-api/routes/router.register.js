'use strict'
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger/swagger-definition.json')
const noteRouter = require('./note/note.router');

const register = app => {
    app.use('/', noteRouter)
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

};

module.exports = register