const fs = require('fs')
const readline = require("readline");

const lineReader = readline.createInterface({
    input: fs.createReadStream('input1.txt'),
    output: process.stdout,
    terminal: false
})

const numRegex = /\d/g

const returnCoordinate = (line) => {
    const cleanLine = line.match(numRegex)
    const coordinates = cleanLine[0] + cleanLine[cleanLine.length -1]
    return coordinates
}

let sum = 0

lineReader.on('line', (line) => {
    const coords = parseInt(returnCoordinate(line))
    // sum += coords
})