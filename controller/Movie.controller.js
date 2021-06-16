const Movie = require('../models/Movie.model');
const axios = require('axios');
require('dotenv').config();


const MOVIE_KEY = process.env.MOVIE_KEY;

const movieController = (req, res) => {

    const search = req.query.query;
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&query=${search}`;
    console.log(movieUrl);

    axios.get(movieUrl).then(response => {
        const result = response.data.results.map(obj => new Movie(obj));
        res.json(result)
    }).catch(error => {
        res.send(error.message);
    });


}

module.exports = movieController;