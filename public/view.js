//create database variable
// console.log('hey');
const numAmount = document.getElementById('numAmount');
const lotteryForm = document.getElementById("lottery-form");
const winCategories = document.getElementById("winCategories");
let result = {}
const winnerDisplay = document.getElementById('winnerDisplay');
const matchDisplay = document.getElementById('matches');
const winsDisplay = document.getElementById('winsDisplay');

const drawDisplay = document.getElementById('drawDisplay');



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
        //console.log('one',drawedSets)
        let matchCount1 = countMatches(drawData);
        let matchCount = JSON.stringify(matchCount1);
        
        data.append('matchCount', matchCount);
        //console.log(matchCount1);

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
                "class" : "card",
                "style": "width: 40%",
                "id": `set${set.serial}`
            });
            let serial = document.createElement('p')
            serial.innerHTML = `Set ${set.serial}`;
            let setNumbers = document.createElement('p')
            setNumbers.innerHTML = `Numbers: ${set.numbers.join(' ')}`;
            let setMatch = document.createElement('p')
            setMatch.innerHTML = `Match: ${set.match}`;
            divSet.appendChild(serial);
            divSet.appendChild(setNumbers);
            divSet.appendChild(setMatch);

            drawDisplay.appendChild(divSet);
        }
        for (match in matchCount1) {
            let matchDis = document.createElement('p');
            matchDis.innerHTML = `${match} : ${matchCount1[match]}`;
            matchDisplay.appendChild(matchDis);
        }
        fetch('http://127.0.0.1:5000/winPrices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data,
        }).then(response => response.json())
        .then(wins => {
            ({ winPerMatch, finalWinnings } = wins);
            //console.log(finalWinnings);
            for (win in winPerMatch) {
                let winDis = document.createElement('p');
                winDis.innerHTML = `${win} : ${winPerMatch[win]}`;
                winsDisplay.appendChild(winDis);
            }
            for (set of drawedSets) {
                set.wins = finalWinnings[`Match${set.match}`];
                let setWins = document.createElement('p');
                setWins.innerHTML = `Winnings: ${set.wins}`;
                let divSet = document.getElementById(`set${set.serial}`)
                divSet.appendChild(setWins);
            }

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
