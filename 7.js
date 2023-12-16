const fs = require('fs')
const path = require("path")
// const splitregex = /(?:\n)/gi;
const input = fs.readFileSync(path.resolve(__dirname, "input7.txt"), "utf8").split('\n')

// A hand consists of five cards labeled one of A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2.

// Every hand is exactly one type. From strongest to weakest, they are:
    // Five of a kind, where all five cards have the same label: AAAAA
    // Four of a kind, where four cards have the same label and one card has a different label: AA8AA
    // Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
    // Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
    // Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
    // One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
    // High card, where all cards' labels are distinct: 23456
    // Hands are primarily ordered based on type; for example, every full house is stronger than any three of a kind.
//each hand is followed by its bid amount. Each hand wins an amount equal to its bid multiplied by its rank

//Seperate every hand and its bid
const hands = input.map((hand) => {
    const split = hand.split(' ')
    return {cards: split[0], bid: split[1]}
})

const results = []

//Iterate through each hand and analyze its type
//Push it to the results array
//Do ordering as I'm pushing to the array, or do ordering after

console.log(hands)
