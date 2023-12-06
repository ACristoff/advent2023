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

analyzeCardResults = (card) => {
    // const cardId
    //TODO There is a more efficient way to do this with regex
    // const winningNums = card.split(/(?:,|:)+/)[1].split("|")[0].trim().split(" ")
    const numSets =  card.split(/(?:,|:)+/)[1].split("|")
    //Have to filter for whitespace
    const winNums = numSets[0].trim().split(" ").filter(function(str) { return /\S/.test(str); });
    const cardNums = numSets[1].trim().split(" ").filter(function(str) { return /\S/.test(str); });

    const matches = winNums.reduce((acc, curr) => {
        if (cardNums.includes(curr)) {
            acc.push(curr)
        }
        return acc
    }, [])

    let power = 0
    matches.forEach((match) => {
        if (power === 0) {
            power += 1
        } else {
            power = power * 2
        }
    })

    return power
}

lineReader.on('line', (line) => {   
    const result = analyzeCardResults(line)
    sum += result
})


lineReader.on('close', () => {
    console.log(sum)
    console.log('---End Log---')
})