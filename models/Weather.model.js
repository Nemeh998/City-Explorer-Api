class Weather {
    constructor(wData) {
        this.description = wData.weather.description;
        this.date = wData.valid_date;
        this.high = wData.max_temp;
        this.low = wData.low_temp;
    }
}




module.exports = Weather;