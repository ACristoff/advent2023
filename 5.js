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

const numRegex = /(?:[0-9])/gi;

const transformSeed = (arr) => {
    const sourceRangeStart = Number(arr[1])
    const destRangeStart = Number(arr[0])
    const range = Number(arr[2])

    const offset = destRangeStart - sourceRangeStart

    const []

    // console.log('offset is, ', offset)

    //assignment makes it unclear without manual checking whether there is overlap in transformations
        //if there is no overlap then I could eliminate seeds from the transformation candidate pool during each transformation and make it more performant
    //loop through each seed
    //if this seed is within the source range, transform it
    //NOTE ranges are 0 indexed

    for (seed of seedMap) {
        if (seed[1] >= sourceRangeStart && seed[1] < sourceRangeStart + range) {
            
            // console.log('offset is, ', offset)
            seedMap.set(seed[0], seed[1] + offset)

            // if recurring seed continue?

            //53
            //18 25 70 -7
            //!Seed 14, soil 14, fertilizer 53, water 49, light 42, temperature 42, humidity 43, location 43.
            
            // if (seed[0] === 14) {
            //     console.log(destRangeStart, sourceRangeStart, range, offset)
            //     console.log(seed)
            // }
            // console.log(seed[0], seed[1])
        }
    }

    // console.log(destRangeStart, sourceRangeStart, range)
}

//!TODO: Instead, map out all transforms by group, then loop through each seed and transform it as many times as necessary. This solution is more efficient instead of going through each transform and checking against each seed.


let transformState = 0

lineReader.on('line', (line) => {
    if (line !== '') {
        const split = line.split(' ')
        if (split[0] === 'seeds:') {
            // console.log(line)
            for (let i = 1; i < split.length; i++) {
                seedMap.set(Number(split[i]), Number(split[i]))
            }
        }
        else if (line[0].match(numRegex)) {
            
            transformSeed(line.split(' '))
        } else {
            console.log(line)
        }
        // else if  ()
    }

})

lineReader.on('close', () => {
    console.log(seedMap)
    console.log('---End Log---')
})