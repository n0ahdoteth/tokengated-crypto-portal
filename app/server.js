const express = require('express');
var cors = require('cors');

const app = express();
const port = 4000;

const ADDRESS = ""

app.get('/', (req, res) =>{
    res.send('Hello World!');
})

app.get('/secret', (req, res) => {
    res.send('Secret Message');
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})