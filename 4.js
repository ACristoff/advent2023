const fs = require('fs')
const readline = require("readline");

const lineReader = readline.createInterface({
    input: fs.createReadStream('input4.txt'),
    output: process.stdout,
    terminal: false
})

let sum = 0

// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53

//For each card
//Seperate card numbers and winning numbers into two sets
//Loop over winning numbers and search card number for matches
//For each match, push to an array
//For each entry in the array multiply the score by 2 (base 1 if there is at least one match)

//Sum results

lineReader.on('line', (line) => {   
    console.log(line)
})


lineReader.on('close', () => {
    console.log('---End Log---')
})