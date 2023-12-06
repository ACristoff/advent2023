const fs = require('fs')
const readline = require("readline");

const lineReader = readline.createInterface({
    input: fs.createReadStream('input4.txt'),
    output: process.stdout,
    terminal: false
})

let sum = 0

lineReader.on('line', (line) => {   
    matrix.push(line)
})


lineReader.on('close', () => {
    console.log('---End Log---')
})