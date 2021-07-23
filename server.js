const express = require('express');
const rng = require('./handlers/rng');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    if (Object.keys(req.query).length !== 0) {
        const queryObject = req.query;
        console.log(queryObject);
        const { minValue, maxValue } = queryObject;
        // console.log(req.query); //min and max
        let random = rng(minValue, maxValue);
        console.log(random);
        res.send(`Your random number is ${random}`);
    } else {
        res.render('index');
    }
})

app.get('/?', (req, res) => {
    const queryObject = req.query;
    const { min, max } = queryObject;
    console.log(req.query); //min and max
    randomNumber = rng(min, max);
    console.log(randomNumber);
    res.send('Hello');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});