const Movie = require('../models/Movie.model');
const axios = require('axios');
require('dotenv').config();
const Cache = require('./helper/cache');//1Cache
const { response } = require('express');
const MOVIE_KEY = process.env.MOVIE_KEY;
const cacheObj = new Cache();//2Cache

const movieController = (req, res) => {
 
    if (cacheObj[requestKey]&&(Date.now()-cacheObj[requestKey].timestamp < 86400000)) {

        res.json(cacheObj[requestKey].data);
    }
else{

    const search = req.query.query;
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&query=${search}`;
    console.log(movieUrl);

    axios.get(movieUrl).then(response => {
        const result = response.data.results.map(obj => new Movie(obj));
        cacheObj[requestKey].data= result;
       
        cacheObj[requestKey].timestamp=Date.now();//1timestamp
    
        res.json(result)


    }).catch(error => {
        res.send(error.message);
    });
}


   


}

module.exports = movieController;