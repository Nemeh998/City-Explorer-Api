
const axios = require('axios');
module.exports = movieHandler;





class Movie {
    constructor(details) {
        this.releaseDate = details.release_date;
        this.title = details.original_title;
        this.totalVotes = details.vote_count;
        this.imagePath = `https://image.tmdb.org/t/p/w500${details.poster_path}`;
    }



}

let merory = [];

function movieHandler(req, res) {

    let keyMovie = process.env.MOVIE_API_KEY;
    let cityMovie = req.query.cityName;
    // let lat = req.query.lat;
    // let long = req.query.long;

    if (merory[cityMovie] !== undefined) {
        console.log('this datat from me');
        res.send(merory[cityMovie]);
    } else {
        console.log('this datat from me');


        let MovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${keyMovie}&query=${cityMovie}`;
        try {
            axios.get(MovieUrl)
                .then(result => {
                    const movieArr = result.data.results.map(elemnt => {
                        return new Movie(elemnt);
                    })
                    // console.log(movieArr);
                    res.send(movieArr);
                })
            merory[cityMovie] = movieArr;
            res.send(movieArr);

        }catch{(error =>res.status(500).send(`Not found ${error}`));
    } 
       
    }

}