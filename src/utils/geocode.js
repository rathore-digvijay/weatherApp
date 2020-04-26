require('dotenv').config();
const request = require('request')

const geocode = (address, callback) => {
    // Format URL
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZGlndmlqYXktciIsImEiOiJjazlmb2x1eXYwZGhyM2x0MGl0emU0czZxIn0.3mf7Wpuy6j2zE9nbxu9slw'
    const map_token = process.env.MAPBOX_API;
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + map_token + '&limit=1'
    request({ url, json: true }, (error, { body }) => {
        console.log("body", body.features.length);
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode