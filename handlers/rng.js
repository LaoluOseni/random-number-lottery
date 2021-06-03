//Random integers around a specific range


//function to draw a number between 1 and maxValue
function generateRandomNumber(minValue, maxValue) {
    let min = Number(minValue);
    let max = Number(maxValue);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function numberCount(num, maxValue, draws) {
    let numbers = [];
    for (let i; i<=num; i++) {
        let random = generateRandomNumber(maxValue);
        numbers.push(random);
    }
}

//let vas = generateRandomNumber(2, 17);
//console.log(vas);

module.exports =  generateRandomNumber;