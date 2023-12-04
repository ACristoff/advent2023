const fs = require('fs')
const readline = require("readline");

const lineReader = readline.createInterface({
    input: fs.createReadStream('input2.txt'),
    output: process.stdout,
    terminal: false
})


lineReader.on('line', (line) => {   
    console.log(line)
})

lineReader.on('close', () => {
    console.log('End Log')
})