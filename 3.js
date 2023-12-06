const fs = require('fs')
const readline = require("readline");

const lineReader = readline.createInterface({
    input: fs.createReadStream('input3.txt'),
    output: process.stdout,
    terminal: false
})

// A gear is any * symbol that is adjacent to exactly two part numbers. 
// Its gear ratio is the result of multiplying those two numbers together

//Create a matrix sorted [[1, 2], [3, 4]]  1 2
//To represent:                            3 4
const matrix = []
let sum = 0

lineReader.on('line', (line) => {   
    matrix.push(line)
})

const isNum = (char) => char !== undefined && Number(char) || char === '0'

const isAdjacent = (matrix, coords) => {
    const xStart = coords.x > 0 ? coords.x - 1 : coords.x
    const xEnd = coords.x < matrix.length -1 ? coords.x + 1 : matrix.length - 1
    const yStart = coords.y > 0 ? coords.y - 1 : coords.y
    const yEnd = coords.y < matrix[coords.x].length -1 ? coords.y + 1 : coords.y
    
    const nums = []

    for (x = xStart; x <= xEnd; x++) {
        for (y = yStart; y <= yEnd; y++) {
            if (Number(matrix[x][y]) || matrix[x][y] === '0') {
                let k = 0
                let numBegin = ''
                let numMid = ''
                let numEnd = y

                while (matrix[x][y - k] && isNum(matrix[x][y - k])) {
                    numBegin = matrix[x][y - k].concat(numBegin)
                    k++
                }

                k = 1
                
                while (matrix[x][y + k] && isNum(matrix[x][y + k])) {
                    numMid += matrix[x][y + k]
                    k++
                }
                
                numEnd = y + k - 1
                const num = numBegin + numMid
                nums.push(Number(num))
                y = numEnd
            }
        }
    }
    return nums
}

//Check each line
//Check each character in each line for a symbol
//If a symbol is reached, find the adjacent numbers, of number sets that are exactly 2 multiply and add them to the total
const analyzer = (matrix) => {
    for(let x = 0; x < matrix.length; x++) {
        for(let y = 0; y < matrix.length; y++) {
            const char = matrix[x][y]
            const isSymbol = matrix[x][y] === '*'

            if (!!isSymbol) {
                const nums = isAdjacent(matrix, {x, y})
                if (nums.length === 2) {
                    const gearRatio = nums[0] * nums[1]
                    sum += gearRatio
                }
                
            }
        }
    }
}

lineReader.on('close', () => {
    analyzer(matrix)
    console.log(sum)
    console.log('---End Log---')
})