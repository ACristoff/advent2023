const fs = require('fs')
const readline = require("readline");

const lineReader = readline.createInterface({
    input: fs.createReadStream('input5.txt'),
    output: process.stdout,
    terminal: false
})

const seedMap = new Map()

//Map the seeds
//Go through each category transformation
    //Figure out range
    //If current seed value is within range, transform it

lineReader.on('line', (line) => {
    console.log(line)
    if (line !== '') {
        const split = line.split(' ')
        if (split[0] === 'seeds:') {
            for (let i = 1; i < split.length; i++) {
                seedMap.set(Number(split[i]), Number(split[i]))
            }
        }
    }

})

lineReader.on('close', () => {
    console.log(seedMap)
    console.log('---End Log---')
})