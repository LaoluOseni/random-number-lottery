//Functions for the number lottery system

//function to draw a random number between 1 and maxValue
function generateRandomNumber(maxValue, minValue=1) {
    let min = Number(minValue);
    let max = Number(maxValue);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Function to draw an amount of random numbers a certain number of times
//Function draws 5(numAmount) numbers * 3(numDraws) times from between 1 and maxValue
//also selects a winning set and creates a matchcount object
function drawNumbers(numAmount, maxValue, numDraws) {
    let drawedSets = [];
    let totalNumbers = numAmount * numDraws;
    let winningSet = [];
    let matchCount = {
        0: 0,
    };
    for (let i=1; i<=numDraws; i++) {
        let numbers = [];
        let set = {};
        //object of numbers
        for (y=1; y<=numAmount; y++) {
            if (i<2) {
                let winnerRandom = generateRandomNumber(maxValue);
                winningSet.push(winnerRandom);
            }
            let random = generateRandomNumber(maxValue);
            numbers.push(random);
            matchCount[y] = 0;            
        }
        set.serial = i;
        set.numbers = numbers
        drawedSets.push(set);
        // drawedSets.push(numbers);
    }
    //console.log(winningSet, drawedSets, totalNumbers);
    return {
        winningSet : winningSet,
        drawedSets : drawedSets,
        totalNumbers : totalNumbers,
        maxValue: maxValue,
        matchCount: matchCount
    }
}



//Test Values
let testWinner = {
    winningSet: [26,17,4,39,12],
    drawedSets: [
        [ 37, 26, 32, 34, 21 ],
        [ 37, 24, 34, 23, 18 ],
        [ 36, 42, 38, 19, 3 ],
        [ 41, 18, 26, 42, 23 ],
        [ 26, 17, 4, 39, 12 ]
    ],
    totalNumbers: 25,
    maxValue: 50,
}
let comparedTestSet = [
    { set: [ 37, 26, 32, 34, 21 ], match: 1 },
    { set: [ 37, 24, 34, 23, 18 ], match: 0 },
    { set: [ 36, 42, 38, 19, 3 ], match: 0 },
    { set: [ 41, 18, 26, 42, 23 ], match: 1 },
    { set: [ 26, 17, 4, 39, 12 ], match: 5 }
]
//Test Values Above

//Analysing functions on drawed numbers
//first analytics function is to find numbercount and percentages of numbers that occured.
function firstAnalytics(drawObject) {
    const { winningSet, drawedSets, totalNumbers, maxValue, matchCount} = drawObject;
    let comparison = [];
    let numberCount = {};
    let percentages = {};
    for (i=1; i<=maxValue; i++) {
        numberCount[i] =0;
        percentages[i] = 0;
        for (let j=0; j<drawedSets.length; j++) {
            //console.log(testSet[j]);
           for(let k=0; k<drawedSets[j].length; k++) {
               if (i === drawedSets[j][k]) {                   
                   numberCount[i]++;
                   percentages[i] = ((numberCount[i]/totalNumbers) * 100);
               }
           }
        }
    }
    for (set of drawedSets) {
        let addSet = {
            'set': set,
            'match': 0,
        };
        for(number of set) {
            for(num of winningSet) {
                if (number === num) {
                    addSet['match']++;
                }
            }
        }
        comparison.push(addSet);
    }
    for (let i=0; i<comparison.length; i++) {
        if (comparison[i].match in matchCount) {
            matchCount[comparison[i].match.toString()]++;
        }
        
    }

    return {
        numberCount: numberCount,
        percentages: percentages,
        comparison: comparison,
        matchCount: matchCount,
    }
}

//before the price you need a winning number
//second set of analytics
//Need a function to compare drawedset with winningSet
//unused. Everything within first analytics
function compareDraws(winningSet, drawedSets) {
    let comparison = [];
    for (set of drawedSets) {
        let addSet = {
            'set': set,
            'match': 0,
        };
        for(number of set) {
            for(num of winningSet) {
                if (number === num) {
                    addSet['match']++;
                }
            }
        }
        comparison.push(addSet);
    }
    console.log(comparison);
    return comparison;
}


//function that gives win catg

//price and winnings
function priceAnalytics(firstanalysis, gamePrice, oneMatch, twoMatch, threeMatch, fourMatch, fiveMatch) {
    const { comparison, matchCount } = firstanalysis;
    //jackpot price is half of total @ N100 per set
    const jackpotPrice = (comparison.length  * gamePrice)/2;
    const jackPercent = jackpotPrice/100;
    //win categories for all price
    const winCategories = {
        5: jackPercent * fiveMatch,
        4: jackPercent * fourMatch,
        3: jackPercent * threeMatch,
        2: jackPercent * twoMatch,
        1: jackPercent * oneMatch,
        0: 0,
    }
    let allWinnings = {};
    for (match in matchCount) {
        if (matchCount[match] == 0) {
            allWinnings[match] = 0;            
        } else {
            allWinnings[match] = (winCategories[match]/matchCount[match])
        }
        
        //console.log(matchCount[match]);
    }
    for (let i=0; i<comparison.length; i++) {
        comparison[i].winnings = allWinnings[comparison[i].match];
    }
    // console.log(allWinnings);
    // console.log(matchCount);
    // console.log(comparison);

    return {
        comparison: comparison,
        matchCount: matchCount,
        jackpotPrice: jackpotPrice,
        allWinnings: allWinnings,
        winCategories: winCategories,
    }
}



// let testObject = drawNumbers(5,50,5);
// let analysis = firstAnalytics(testObject);
// let winnings = priceAnalytics(analysis);
// console.log(analysis);

//priceAnalytics(comparedTestSet, maxValue);
//compareDraws(testWin, testSet);
//drawNumbers(10, 50, 50);
//firstAnalytics(testSet, totalNumbers, maxValue);
//priceAnalytics(testSet, maxValue);

module.exports = {
    drawNumbers,
    firstAnalytics,
    priceAnalytics,
}