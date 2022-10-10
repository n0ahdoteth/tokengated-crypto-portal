const express = require('express')
let cors = require('cors')
const path = require('path')
const app = express()
const port = 3000
const router = express.Router();

app.use(cors())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use('/', router);

app.get('/secret', (req, res) => {
    res.send('SECRET')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})


const address = "";
const abi = "";