const express = require('express');

const app = express()

app.get('/', (req, res) => {
    res.send('Wazzapp')
});

app.listen(3333);