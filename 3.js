const fs = require('fs')
const readline = require("readline");

const lineReader = readline.createInterface({
    input: fs.createReadStream('input3.txt'),
    output: process.stdout,
    terminal: false
})

// Any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)
// 467..114..
// ...*......

//Create a matrix sorted [[1, 2], [3, 4]]  1 2
//To represent:                            3 4
const matrix = []
let sum = 0

lineReader.on('line', (line) => {   
    matrix.push(line)
})

const isAdjacent = (matrix, coords) => {
    const xStart = coords.x > 0 ? coords.x - 1 : coords.x
    const xEnd = coords.x < matrix.length -1 ? coords.x + 1 : matrix.length - 1
    const yStart = coords.current > 0 ? coords.current - 1 : coords.current
    const yEnd = coords.endOfNum < matrix[coords.x].length -1 ? coords.endOfNum + 1 : coords.endOfNum

    for (x = xStart; x <= xEnd; x++) {
        for (y = yStart; y <= yEnd; y++) {
            const isSymbol = matrix[x][y] !== '.' && !parseInt(matrix[x][y]) && matrix[x][y] !== '0' ? true : false 

            if (isSymbol) return true
        }
    }
    return false
}

const findNumberEnd = (line, index) => {
    let next = index + 1
    while (line[next] !== undefined && Number(line[next]) || line[next] === '0') {
        next++
    }
    return next - 1
}

//Check each line
//Check each character in each line for a number
//If a number is reached, check for adjacent symbols then add it to the pile
const analyzer = (matrix) => {
    for(let x = 0; x < matrix.length; x++) {
        for(let y = 0; y < matrix.length; y++) {
            const char = matrix[x][y]
            const isNum = parseInt(char)

            if (!!isNum) {
                const endofNumber = findNumberEnd(matrix[x], y)
                const isGear = isAdjacent(matrix, {x, current: y, endOfNum: endofNumber})
                
                if (isGear) {
                    const nums = []

                    for (let i = y; i <= endofNumber; i++) {
                        nums.push(matrix[x][i])
                    }

                    sum += parseInt(nums.join(''))
                }
                y = endofNumber
            }
        }
    }
}

lineReader.on('close', () => {
    analyzer(matrix)
    console.log(sum)
    console.log('---End Log---')
})