//Lottery system functions

//Draw a number between 1 and maxValue
function generateRandomNumber(maxValue, minValue=1) {
    let min = Number(minValue);
    let max = Number(maxValue);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Function to run the number draws
function drawNumbers(numAmount, maxValue, numDraws) {
    let drawedSets = [];
    let winningNumbers = new Set();
    let totalNumbers = numAmount * numDraws;

    do {
        winningNumbers.add(generateRandomNumber(maxValue));
    } while (winningNumbers.size < numAmount);

    winningNumbers = Array.from(winningNumbers);


    for (let i=1; i<=numDraws; i++) {
        const numbers = new Set();
        const set = {};

        do {
            numbers.add(generateRandomNumber(maxValue));
        } while (numbers.size < numAmount);

        set.serial = i;
        set.numbers = Array.from(numbers);
        drawedSets.push(set);
    }

    return {
        winningNumbers: winningNumbers,
        drawedSets: drawedSets,
    }
    console.log(winningNumbers, drawedSets);
}

//Checks matches on the sets and updates them
function checkMatches(drawData) {
    const { winningNumbers, drawedSets} = drawData;
    //const numAmount =  winningNumbers.size;
    for (set of drawedSets) {
        set.match = 0;
        for (let num of set.numbers) {
            if (winningNumbers.has(num)) {
                set.match++;
            }
        }
    }
    //console.log(winningNumbers, drawedSets);
}


//Counts the number of matches and returns a match count object
function countMatches(drawData) {
    const { winningNumbers, drawedSets} = drawData;
    const numAmount = winningNumbers.size;
    const matchCount = {}
    
    for (i=0; i<=numAmount; i++) {
        matchCount[`Match${i}`] = 0;
    }

    for (set of drawedSets) {
        matchCount[set.match]++
    }

    return matchCount;
}




//Price Determination
//winnings is an object
function drawPrices(numDraws, playPrice, winnings, matchCount) {
    const jackpotPrice = numDraws * playPrice;
    const winCategories = {};
    const finalWinnings = {};
    for (match in winnings) {
        winCategories[match] = Number(winnings[match]) * (jackpotPrice/100);
    }

    for (match in matchCount) {
        if (matchCount[match] == 0) {
            finalWinnings[match] = 0;            
        } else {
            let win = (winCategories[match]/matchCount[match]);
            win = (Math.floor(win * 100) / 100);
            finalWinnings[match] = win;
        }        
        //console.log(matchCount[match]);
    }

    return {
        winCategories: winCategories,
        finalWinnings: finalWinnings,
    }
}



//Other analysis = numberCount or percentages
function analysis(drawedSets, numAmount, maxValue) {
    const totalNumbers = drawedSets.length * numAmount;
    const numberCount = {};
    const percentages = {};

    for (i=1; i<=maxValue; i++) {
        numberCount[i] = 0;
        percentages[i] = 0;

        for (set of drawedSets) {
            for(let num of set.numbers) {
                if (i === num) {
                    numberCount[i]++;
                    percentages[i] = ((numberCount[i]/totalNumbers) * 100);
                }
            }
        }
    }
}



// let drawData = drawNumbers(5, 50, 10);
// checkMatches(drawData);
// console.log(drawData);

// let matchCount = countMatches(drawData);
// console.log(matchCount);



module.exports = {
    drawNumbers,
    checkMatches,
    countMatches,
    drawPrices,
    analysis,
}