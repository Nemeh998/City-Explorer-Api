const express = require('express')
const cors=require('cors')
//ad the data
const weather=require('./assetes/weather.json')
const app = express()
 // routes or endpoints
app.get('/', function (req, res) {
  res.send('Hello World')
})
//cors cus the data late frome renderd
app.use(cors());
// see if it work   npm start or nodemon
//http://localhost:3001/weather 
app.get('/weather', (req, res) => {
  const arrOfData=weather.data.map(data=>new Weather(data));
res.send(arrOfData);

});

class Weather{
  constructor(data){
    this.date=data.valid_date;
    this.description=data.weather.description;
  }
}
 // start sirver in port 3000

 app.listen(3001)