const express = require('express')
const cors=require('cors')
const superagent=require('superagent');
//ad the data
const weather=require('./assetes/weather.json')
const app = express()
 // routes or endpoints
app.get('/', function (req, res) {
  res.send('Hello World')
})
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;


app.use(cors());

app.get('/weather', (req, res) => {
  try{
  const wetherBitURl =`http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
//  console.log(wetherBitURl);
superagent.get(wetherBitURl).then(weatherBitData =>{
  const arrOfData=  weatherBitData.body.data.map(data => new Weather(data));
  // res.send(data.body);
  res.send(arrOfData);

}).catch(error =>{
  console.log(error);
});
  }catch(error){
  const arrOfData=weather.data.map(data => new Weather(data));}
res.send(arrOfData);
// res.send('its work');
});

class Weather{
  constructor(data){
    this.date=data.valid_date;
    this.description=data.weather.description;
  }
}
 // start sirver in port 3000



 app.listen(3001)