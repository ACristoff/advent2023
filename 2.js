const fs = require('fs')
const readline = require("readline");

const lineReader = readline.createInterface({
    input: fs.createReadStream('input2.txt'),
    output: process.stdout,
    terminal: false
})

//Game 100: 8 green, 7 blue, 1 red; 10 blue, 2 green, 5 red; 12 blue, 1 green, 1 red; 9 green, 9 blue, 2 red; 1 blue, 5 red, 3 green
//Seperate into buckets
//Game IDs,
//Hands,
//Colors: Green, Blue, Red

//Return an object with the hand
const handAnalyzer = (hand) => {
    const colors = hand.split(',')
    const handData = {}

    for (obj of colors) {
        const splitObj = obj.split(' ')
        const color = splitObj[2]
        const number = splitObj[1]

        handData[`${color}`] = parseInt(number)
    }
    return handData
}

let sum = 0

const gameAnalyzer = (game) => {
    const split = game.split(':')
    const gameId = parseInt(split[0].split(' ')[1])
    const hands = split[1].split(';')
    const greatestHand = {}

    //logs the greatest color among hands
    for (hand of hands) {
        const result = handAnalyzer(hand)

        for (color in result) { 
            if(greatestHand[color] === undefined) {
                greatestHand[color] = result[color]
            } else if (greatestHand[color] < result[color]) {
                greatestHand[color] = result[color]
            }
        }
    }

    //gets the power of the cubes
    const cubePower = greatestHand.red * greatestHand.green * greatestHand.blue 

    return cubePower
}


lineReader.on('line', (line) => {   
    const analysis = gameAnalyzer(line)
    sum += analysis
})

lineReader.on('close', () => {
    console.log(sum)
    console.log('---End Log---')
})