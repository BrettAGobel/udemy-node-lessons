const express = require('express')
const app = express()
const port = 3000
const logger = require('morgan')
const bodyParser = require('body-parser')
const debug = require('debug')
const register = require('./routes/router.register')
const path = require('path')

app.use(express.static("public"));
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))


register(app);

app.set('port', process.env.port || 3000)

// app.post('/', (req, res) => {
//     res.
// })

 const server = app.listen(app.get('port'), () => {
    console.log(`testing express app on port ${port}`)
} )




