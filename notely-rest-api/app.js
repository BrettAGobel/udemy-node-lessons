const express = require('express')
const app = express()
const port = 3000
const logger = require('morgan')
const bodyParser = require('body-parser')
const debug = require('debug')
const register = require('./routes/router.register')

app.use(bodyParser.json)
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))


register(app);

app.get('/', (req, res) => {
    res.send('is this thing on?')
})

app.listen(port, () => {
    console.log(`testing express app on port ${port}`)
} )