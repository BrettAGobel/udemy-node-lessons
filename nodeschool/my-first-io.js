const fs = require('fs')
let regEx = /\n/
str = fs.readFileSync(process.argv[2]).toString().split(regEx);

//let newArr = str.split(regEx)
let newLineSum = str.length -1
console.log(newLineSum)

