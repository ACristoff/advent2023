const fs = require('fs')
const readline = require("readline");

const lineReader = readline.createInterface({
    input: fs.createReadStream('input5.txt'),
    output: process.stdout,
    terminal: false
})

const seedMap = new Map()
const mapsList = []
const results = []

//Map the seeds
//Go through each category transformation
    //Figure out range
    //If current seed value is within range, transform it
const numRegex = /(?:[0-9])/gi;

const transformSeedRange = (arrIndex, seedRange) => {
    if (arrIndex === mapsList.length) return [seedRange]
    const innerResult = []

    for (const transforms of mapsList[arrIndex].transforms) {
        const destination = Number(transforms[0])
        const source = Number(transforms[1])
        const range = Number(transforms[2])
        if (seedRange[0] < source && seedRange[0] + seedRange[1] > source && seedRange[0] + seedRange[1] <= source + range ) {
            const startRange = [seedRange[0], source - seedRange[0]]
            const endRange = [destination, seedRange[1] - source + seedRange[0]]
            innerResult.push(...transformSeedRange(arrIndex + 1, endRange), ...transformSeedRange(arrIndex, startRange))
            break
        } else if (seedRange[0] >= source && seedRange[0] < source + range && seedRange[0] + seedRange[1] > source + range) {
            const startRange = [destination + seedRange[0] - source, source + range - seedRange[0]]
            const endRange = [source + range, seedRange[0] + seedRange[1] - source - range]
            innerResult.push(...transformSeedRange(arrIndex + 1, startRange),  ...transformSeedRange(arrIndex, endRange))
            break
        } else if (seedRange[0] >= source && seedRange[0] + seedRange[1] <= source + range) {
            innerResult.push(...transformSeedRange(arrIndex + 1, [destination + seedRange[0] - source, seedRange[1]]))
            break
        } else if (seedRange[0] < source && seedRange[0] + seedRange[1] > source + range) {
            const startRange = [seedRange[0], source - seedRange[0]]
            const midRange = [destination, range]
            const endRange = [source + range, seedRange[0] + seedRange[1] - source - range]
            innerResult.push(...transformSeedRange(arrIndex, endRange), ...transformSeedRange(arrIndex + 1, midRange), ...transformSeedRange(arrIndex, startRange))
            break
        }
    }

    if (innerResult.length === 0) innerResult.push(...transformSeedRange(arrIndex + 1, seedRange))

    return innerResult
}

lineReader.on('line', (line) => {
    if (line !== '') {
        const split = line.split(' ')
        if (split[0] === 'seeds:') {
            for (let i = 1; i < split.length; i += 2) {
                seedMap.set(Number(split[i]), Number(split[i + 1]))
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
lineReader.on('close', () => {
    for (const seedRange of seedMap) { 
        results.push(transformSeedRange(0, seedRange))
    }
    console.log(Math.min(...results.flat().map(x => x[0])));
    console.log('---End Log---')
})