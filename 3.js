const fs = require('fs')
const readline = require("readline");

const lineReader = readline.createInterface({
    input: fs.createReadStream('input3.txt'),
    output: process.stdout,
    terminal: false
})


lineReader.on('line', (line) => {   

})

lineReader.on('close', () => {
    // console.log(sum)
    console.log('---End Log---')
})