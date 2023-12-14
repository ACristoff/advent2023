const fs = require('fs')
const path = require("path")
const input = fs.readFileSync(path.resolve(__dirname, "input6.txt"), "utf8").split("\n")

const distances = input[0].split(' ').filter(function(str) { return /\S/.test(str); })
const times = input[1].split(' ').filter(function(str) { return /\S/.test(str); })

const races = distances.slice(1, distances.length).map((entry, index) => {
    return [entry, times[index + 1]]
})

//Form a distance and time pairing, push it to the races array

// This document describes three races:
// The first race lasts 7 milliseconds. The record distance in this race is 9 millimeters.
// The second race lasts 15 milliseconds. The record distance in this race is 40 millimeters.
// The third race lasts 30 milliseconds. The record distance in this race is 200 millimeters.

// Your toy boat has a starting speed of zero millimeters per millisecond. For each whole millisecond you spend at the beginning of the race holding down the button, the boat's speed increases by one millimeter per millisecond.


console.log(distances, times, races)