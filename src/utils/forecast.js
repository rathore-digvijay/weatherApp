require('dotenv').config();
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    // Format URL of weather stack
    // const url = 'http://api.weatherstack.com/current?access_key=a4e58569d96ef32bb3b8976a1c708cab&query=Delhi&units=m'
    const weather_token = process.env.WEATHER_API;
    const unit = 'm';   // m: celcius, s: kelvin, f: farenheight
    const url = 'http://api.weatherstack.com/current?access_key=' + weather_token + '&query=' + latitude + ',' + longitude + '&units=' + unit

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const dayTime = body.current.is_day = "no" ? "Night" : "Day";
            const text = ' It is currently ' + body.current.temperature + ' degress out in ' + dayTime + '. There is a ' + body.current.precip + '% chance of rain and wind speed is ' + body.current.wind_speed + ' .';
            callback(undefined, text)
        }
    })
}

module.exports = forecast