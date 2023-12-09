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

//Each card creates copies of the subsequent cards equivalent to its matches
//Use a map to add IDs and their copies

analyzeCardResults = (card) => {
    //TODO There is a more efficient way to do this with regex
    const split =  card.split(/(?:,|:)+/)
    const cardId = Number(split[0].split(" ").filter(function(str) { return /\S/.test(str); })[1])
    const numSets = split[1].split("|")
    //Have to filter for whitespace
    const winNums = numSets[0].trim().split(" ").filter(function(str) { return /\S/.test(str); })
    const cardNums = numSets[1].trim().split(" ").filter(function(str) { return /\S/.test(str); })

    const matches = winNums.reduce((acc, curr) => {
        if (cardNums.includes(curr)) {
            acc.push(curr)
        }
        return acc
    }, [])

    return {matches: matches.length, Id: cardId}
}

const copyMap = new Map();

copyMap.set(1, 1)

lineReader.on('line', (line) => {   
    const cardResult = analyzeCardResults(line)
    const currentCopyNumber = copyMap.get(cardResult.Id)

    for (let i = 0; i < cardResult.matches; i++) {
        const nextCardId = cardResult.Id + i + 1
        const getNextCard = copyMap.get(nextCardId) ? copyMap.get(cardResult.Id + i + 1) : 1

        copyMap.set(nextCardId, getNextCard + 1 * currentCopyNumber)
    }

    if (cardResult.matches === 0) {
        const nextCard = copyMap.get(cardResult.Id + 1) ? copyMap.get(cardResult.Id + 1) : 1
        copyMap.set(cardResult.Id + 1, nextCard)
    }

})

lineReader.on('close', () => {
    copyMap.forEach((v) => {
        sum += v
    })
    console.log(sum - 1)
    console.log('---End Log---')
})