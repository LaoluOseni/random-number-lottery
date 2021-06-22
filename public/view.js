//create database variable
// console.log('hey');
const numAmount = document.getElementById('numAmount');
const lotteryForm = document.getElementById("lottery-form");
const winCategories = document.getElementById("winCategories");
let result = {}
const winnerDisplay = document.getElementById('winnerDisplay');



//Event Listeners
numAmount.addEventListener("change", e => {
   let number = (e.target.value);
   while (winCategories.firstChild) {
       winCategories.removeChild(winCategories.firstChild); 
   }
   for (i=1; i<=number; i++) {
       let priceInput = document.createElement('input');
       updateAttributes(priceInput, {
        "type": "number",
        "class": "form",
        "name": `Match${i}`,
        'id': `Match${i}`,
        'placeholder': `Match ${i}`,
       })
       winCategories.appendChild(priceInput);
   }
})

lotteryForm.addEventListener("submit", drawNumbers);


//API functions
function drawNumbers(event) {
    //console.log(event);
    event.preventDefault();

    const data = new URLSearchParams();
    for (const pair of new FormData(lotteryForm)) {
    data.append(pair[0], pair[1]);
    }
    //console.log(Object.keys(data));


    fetch('http://127.0.0.1:5000/playlottery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }, 
        body: data,

    }).then(response => response.json())
    .then(drawData => {
        ({ winningNumbers, drawedSets } = drawData);
        checkMatches(drawData);
        console.log('one',drawedSets)
        let matchCount = JSON.stringify(countMatches(drawData));
        
        data.append('matchCount', matchCount);

        ({ winningNumbers, drawedSets } = drawData);
        let winNum = document.createElement('h4');
        let winNumbers = document.createElement('p');
        winNum.innerHTML = "Winning Numbers";
        winNumbers.innerHTML = `${winningNumbers}`;
        winnerDisplay.appendChild(winNum);
        winnerDisplay.appendChild(winNumbers);
        for(set of drawedSets) {
            let divSet = document.createElement('div');
            updateAttributes(divSet, {

            })
        }
        fetch('http://127.0.0.1:5000/winPrices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data,
        }).then(response => response.json())
        .then(wins => {
            result = wins
            console.log('the wins', wins);
            for(i=0;i<=4;i++){
                let div = document.createElement('div')
                div.innerHTML= wins.finalWinnings[`Match${i}`]
                document.getElementById('winnings').appendChild(div)
            }
            // ({ winCategories, finalWinnings } = wins);
        }).catch(function (error) {
            console.log(error);
        })

    })
    .catch(function (error) {
        console.log(error);
    })
}





//Matching functions
function checkMatches(drawData) {
    const { winningNumbers, drawedSets} = drawData;
    //const numAmount =  winningNumbers.size;
    for (set of drawedSets) {
        set.match = 0;
        for (let num of set.numbers) {
            if (winningNumbers.includes(num)) {
                set.match++;
            }
        }
    }
    //console.log(winningNumbers, drawedSets);
}

function countMatches(drawData) {
    const { winningNumbers, drawedSets} = drawData;
    const numAmount = winningNumbers.length;
    //console.log(numAmount)
    const matchCount = {}
    
    for (i=0; i<=numAmount; i++) {
        matchCount[`Match${i}`] = 0;
    }

    for (set of drawedSets) {
        matchCount[`Match${set.match}`]++
    }

    return matchCount;
}



//Handling Wins
function displayWins(winData) {
    ({ winCat, finalWinnings } = winData);
}


//Helper function
function updateAttributes(elem, attributes) {
    for (let key in attributes) {
        elem.setAttribute(key, attributes[key]);
    }
}
