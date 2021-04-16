
const fs = require('fs')
let regEx = /\n/
let newData = 0
fs.readFile(process.argv[2], 'utf8' , (err, data) => {
    if (err) {
        console.error(err)

    } else
    console.log(data.split(regEx).length -1)



})//.toString().split(regEx);

//let newArr = str.split(regEx)

