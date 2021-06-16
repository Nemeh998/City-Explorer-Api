const Weather = require('../models/Weather.model');
const axios = require('axios');
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
//const wData = require('./data/weather.json');
require('dotenv').config();

const weatherController = (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    console.log(lat);
    if (lat && lon) {
        const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`

        axios.get(weatherUrl).then(response => {
            const respData = response.data.data.map(obj => new Weather(obj));

            res.json(respData)
        }).catch(error => {
            res.send(error.message);
        });
        console.log(weatherUrl);
    }
    else {
        res.send('please provide the proper lat and lon ');
    }

};

module.exports = weatherController;
