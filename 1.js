const fs = require('fs')
const readline = require("readline");

const lineReader = readline.createInterface({
    input: fs.createReadStream('input1.txt'),
    output: process.stdout,
    terminal: false
})

const numberMap = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
}

const verifyNumber = (string) => {
    if (!parseInt(string)) {
        return numberMap[string]
    }
    return parseInt(string)
}

const numRegex = /(?:[0-9]|one|two|three|four|five|six|seven|eight|nine)/gi;
const revNumRegex = /(?:[0-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/gi;

const reverse = (str) => {
    return str.split("").reverse().join("")
}

const returnCoordinate = (line) => {
    const firstMatch = line.match(numRegex)[0]
    const lastMatch = reverse(reverse(line).match(revNumRegex)[0])
    
    const coordinates = `${verifyNumber(firstMatch)}${verifyNumber(lastMatch)}`
    return coordinates
}

let sum = 0

lineReader.on('line', (line) => {
    const coords = parseInt(returnCoordinate(line))
    sum += coords
})

lineReader.on('close', () => {
    console.log(sum)
})