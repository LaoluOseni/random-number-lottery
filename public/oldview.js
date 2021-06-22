//create database variable
let db;
console.log('hey');

const lotteryForm = document.getElementById("lottery-form");
const playdraws = document.getElementById("playdraws");

lotteryForm.addEventListener("submit", drawNumbers)




//API functions
function drawNumbers(event) {
    event.preventDefault();
    console.log('form submitted now');


    const data = new URLSearchParams();
    for (const pair of new FormData(lotteryForm)) {
    data.append(pair[0], pair[1]);
    }

    console.log(data);

    fetch('http://127.0.0.1:5000/playlottery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data, 
    }).then(function(response) {
        return response.json();
    }).then(function(res) {
        const winningSet = res.winningSet;
        const draws = res.drawedSets;
        createDB(draws);
        console.log(res);
    }).catch(function (error) {
        console.log(error);
    })    
}


//Database functions
function createDB(draws) {
    const request = indexedDB.open("numberSets", 1);

    request.onupgradeneeded = e => {
        db = e.target.result; //this is the database

        let firstSet = db.createObjectStore = db.createObjectStore("sets", { keyPath: 'serial', autoIncrement:true});

        console.log('object called')
    }

    request.onsuccess = e => {
        db = e.target.result;
        // addDraws(draws);
    }

    request.onerror = e => {
        alert(e.target.error);
    }
}

function addDraws(draws) {
    const tx = db.transaction("sets", "readwrite");
    const firstSet = tx.objectStore("sets");
    for (draw in draws) {
        let req = firstSet.add(draw);
        req.onsuccess = e => {
            console.log('done');
        }
        req.onerror = e => {
            console.log(e);
        }
    }
}