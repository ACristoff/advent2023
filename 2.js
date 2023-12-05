const fs = require('fs')
const readline = require("readline");

const lineReader = readline.createInterface({
    input: fs.createReadStream('input2.txt'),
    output: process.stdout,
    terminal: false
})

//?Wouldn't it be more efficient to just search for a color and it's number that doesn't correspond to the rules?


//Total number of cubes: 12 red cubes, 13 green cubes, and 14 blue cubes
const total = {'red': 12, 'green': 13, 'blue': 14}

//Game 100: 8 green, 7 blue, 1 red; 10 blue, 2 green, 5 red; 12 blue, 1 green, 1 red; 9 green, 9 blue, 2 red; 1 blue, 5 red, 3 green
//Seperate into buckets
//Game IDs,
//Hands,
//Colors: Green, Blue, Red

const handAnalyzer = (hand) => {
    const colors = hand.split(',')
    const handData = {}

    for (obj of colors) {
        const splitObj = obj.split(' ')
        const color = splitObj[2]
        const number = splitObj[1]

        handData[`${color}`] = parseInt(number)

        if (handData[`${color}`] > total[`${color}`]) {
            // console.log(`ERROR, current ${color} is greather than total ${color}`)
            // console.log(handData)
            return false
        }
    }

    // console.log(handData)
    
    return true
}

var sum = 0

const gameAnalyzer = (game) => {
    const split = game.split(':')
    const gameId = parseInt(split[0].split(' ')[1])
    const hands = split[1].split(';')

    for (hand of hands) {
        const result = handAnalyzer(hand)
        if (result !== true) {
            return {gameId, result: false}
        }
    }
    return {gameId, result: true}
}


lineReader.on('line', (line) => {   
    // console.log(line)

    const analysis = gameAnalyzer(line)

    if (analysis.result === true) {
        sum += analysis.gameId
        // console.log(`Game ${gameId} valid`)
    }
})

lineReader.on('close', () => {
    console.log(`Valid Sum: ${sum}`)
    console.log('---End Log---')
})