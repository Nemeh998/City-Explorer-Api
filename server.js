const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
app.use(cors())
const { response } = require('express');
const weatherController = require('./controller/Weather.controller');
const indexController = require('./controller/index.controller');
const movieController = require('./controller/Movie.controller');
const port = process.env.PORT;

app.get('/', indexController);

app.get('/weather', weatherController);

app.get('/movie', movieController);


app.listen(port, () => {
  console.log(`server start on port: ${port}`);
}
);
