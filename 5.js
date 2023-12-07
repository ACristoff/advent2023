const fs = require('fs')
const readline = require("readline");

const lineReader = readline.createInterface({
    input: fs.createReadStream('input5.txt'),
    output: process.stdout,
    terminal: false
})


const copyMap = new Map();

copyMap.set(1, 1)

lineReader.on('line', (line) => {   
    console.log(line)
})

lineReader.on('close', () => {
    console.log('---End Log---')
})