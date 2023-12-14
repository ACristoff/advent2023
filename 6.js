const fs = require('fs')
const path = require("path")
const input = fs.readFileSync(path.resolve(__dirname, "input6.txt"), "utf8").split("\n")

const distances = input[0].split(' ').filter(function(str) { return /\S/.test(str); })
const times = input[1].split(' ').filter(function(str) { return /\S/.test(str); })

const races = distances.slice(1, distances.length).map((entry, index) => {
    return [Number(entry), Number(times[index + 1])]
})

// Your toy boat has a starting speed of zero millimeters per millisecond. For each whole millisecond you spend at the beginning of the race holding down the button, the boat's speed increases by one millimeter per millisecond.

const results = []

//Iterate through the times, calculating possible wins and stopping when a win is no longer valid
//! There must be an easier way to calculate than iteration
const calculateLongest = (time, distance) => {
    let possibleWins = 0

    //i represents speed for each millisecond held
    for (let i = 1; i <= time; i++) {
        const isWinningMove = i * (time - i) > distance

        if (isWinningMove) {
            possibleWins++
        } else if (isWinningMove && possibleWins > 0) {
            break
        }
    }
    return possibleWins
}

for (race of races) {
    results.push(calculateLongest(race[0], race[1]))
}

console.log(results.reduce((acc, i) => acc * i))
