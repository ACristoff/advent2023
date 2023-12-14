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

const transformSeed = (transformationArr, seed) => {
    const sourceRangeStart = Number(transformationArr[1])
    const destRangeStart = Number(transformationArr[0])
    const range = Number(transformationArr[2])
    const offset = destRangeStart - sourceRangeStart
    //NOTE ranges are 0 indexed
    if (seed[1] >= sourceRangeStart && seed[1] < sourceRangeStart + range) {
        seedMap.set(seed[0], seedMap.get(seed[0]) + offset)
        return true
    }
    return false
}

const mapsList = []

lineReader.on('line', (line) => {
    if (line !== '') {
        const split = line.split(' ')
        if (split[0] === 'seeds:') {
            for (let i = 1; i < split.length; i++) {
                seedMap.set(Number(split[i]), Number(split[i]))
            }
        } else if (line[0].match(numRegex)) {
            mapsList[mapsList.length - 1].transforms.push(split)
        } else {
            mapsList.push({type: split[0], transforms: []})
        }
    }

})

//Go through each seed
    //Go through each array category
        //Loop through each category's maps
        //if the seed is transformed by one of the maps move to the next category
const transformAll = () => {
    for (const seed of seedMap) { 
        for (let i = 0; i < mapsList.length; i++) {     
            for (let j = 0; j < mapsList[i].transforms.length; j++) {
                const skipToNext = transformSeed(mapsList[i].transforms[j], [seed[0], seedMap.get(seed[0])])
                if (skipToNext === true) break;
            }
        }
    }
}

lineReader.on('close', () => {
    transformAll()
    // console.log(seedMap)
    console.log(Math.min(...seedMap.values()))
    console.log('---End Log---')
})