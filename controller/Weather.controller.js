const axios = require('axios');
const Weather = require('../models/Weather.model');
require('dotenv').config();
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const Cache = require('./helper/cache');//1Cache
const { response } = require('express');
//const wData = require('./data/weather.json');

const cacheObj = new Cache();//2Cache
const weatherController = (req, res) => {


    const lat = req.query.lat;
    const lon = req.query.lon;


    const requestKey = `weather-${lat}-${lon}`;

    // console.log(requestKey);
    // console.log(cacheObj[requestKey], "cacheObj[requestKey]");

    // console.log(lat);




    if (lat && lon) {
        
        if (cacheObj[requestKey]&&(Date.now()-cacheObj[requestKey].timestamp < 86400000)) {

            console.log("==========================");
            console.log("from the cache object");
            console.log("==========================");
            res.json(cacheObj[requestKey].data);
        } 
        else {


            const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`

            axios.get(weatherUrl).then(response => {
                const respData = response.data.data.map(obj => new Weather(obj));

                console.log("==========================");
                console.log("from the cache axios request");
                console.log("==========================");
                console.log("==========================");
                console.log("storing data in to our request");
                console.log("==========================");
                cacheObj[requestKey].data= respData;
                //each time to request
                cacheObj[requestKey].timestamp=Date.now();//1timestamp
                res.json(respData);
//time out to clear the cache 
            }).catch(error => {
                res.send(error.message);
            });
          
        }


    }
    else {
        res.send('please provide the proper lat and lon ');
    }

};

module.exports = weatherController;
