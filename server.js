'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./assets/whether.json');
const axios = require('axios');

const server = express();
server.use(cors());

const PORT = process.env.PORT;

const movieHandler = require('./modules/Movie');
server.get('/movie', movieHandler);


const weatherHandler = require('./modules/Weather');
server.get('/weather', weatherHandler);


server.get('*', (req, res) => {
    res.status(404).send('not found')
})

server.listen(PORT, () => {
    console.log(`listtening on PORT ${PORT}`)
})