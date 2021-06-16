
const axios = require('axios');
module.exports = weatherHandler;



class Forecast{
    constructor(day){

        this.date = day.valid_date;
        this.description = day.weather.description;
    }

    

}

function weatherHandler(req, res) {
    let keyWeather = process.env.WEATHER_API_KEY;
    let cityName = req.query.cityName;

    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${keyWeather}`;
    
    axios
        .get(weatherUrl)
        .then(result => {
            const weatherArr = result.data.data.map(item => {
                return new Forecast(item)
            })
            res.send(weatherArr);

        })



        .catch(error => res.status(500).send(`Not found ${error}`))

}