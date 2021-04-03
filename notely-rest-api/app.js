const express = require('express')
const app = express()
const port = 3000
const logger = require('morgan')
const bodyParser = require('body-parser')
const debug = require('debug')

app.use(bodyParser.json)

app.get('/', (req, res) => {
    res.send('is this thing on?')
})

app.listen(port, () => {
    console.log(`testing express app on port ${port}`)
} )