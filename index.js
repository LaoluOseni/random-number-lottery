const { match } = require('assert');
const express = require('express');
const lotfunc = require('./models/lotfunc');
const fs = require('fs');
const path = require('path');
const lottery = require('./models/lottery');
const app = express();
const cors = require('cors')

//MiddleWare
app.use(express.static(__dirname + "/public"))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'views', 'view.html'), (err, content) => {
        if (err) throw err;
        res.end(content);

    });
})




app.post('/winPrices', (req, res) => {
    const { numDraws, playPrice, matchCount } = req.body

    //Create Price Winnings Object
    const winnings = {
        Match0: 0,
    };
    for (item in req.body) {
        if (`${item[0]}` === 'M') {
            winnings[item] = Number(req.body[item]);
        }
    }
    //console.log(winnings);
    let matchCount1 = JSON.parse(matchCount);
    //console.log(matchCount1);

    let wins = lotfunc.drawPrices(numDraws, playPrice, winnings, matchCount1);

    //console.log(wins);
    wins = JSON.stringify(wins);

    res.setHeader('Content-Type', 'application/json');
    res.send(wins);

})


app.post('/playlottery', (req, res) => {
    console.log(req.body);
    const { numAmount, maxValue, numDraws, playPrice } = req.body;

    const draws = lotfunc.drawNumbers(numAmount, maxValue, numDraws);
    //console.log(draws);
    sentDraws = JSON.stringify(draws);

    res.setHeader('Content-Type', 'application/json');
    res.send(sentDraws);
})


app.get('/analysis', (req, res) => {

})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})