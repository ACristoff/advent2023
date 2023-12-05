const fs = require('fs')
const readline = require("readline");

const lineReader = readline.createInterface({
    input: fs.createReadStream('input3.txt'),
    output: process.stdout,
    terminal: false
})

//There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)
// 467..114..
// ...*......

//Read first/each line for numbers and symbols, identify their indixes
//if a number's index range is adjacent to a symbol's index, add to part list
//Move to next line, keep previous symbol index
//if a number's index is adjacent to a symbol, or equal to or adjacent to a previous symbol, add it to part list
//if a symbol's index is adjacent to a previous number's index range, add that number to the part list

lineReader.on('line', (line) => {   

})

lineReader.on('close', () => {
    // console.log(sum)
    console.log('---End Log---')
})