const request = require('request');

let getWeather = (LAT, LNG, callback) => {
  request({
    url: `https://api.forecast.io/forecast/cc9d6de3f8a0ccc99e224621e9b8db6f/${LAT},${LNG}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io server.');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
}


// cc9d6de3f8a0ccc99e224621e9b8db6f
// developer.forecast.io
module.exports.getWeather = getWeather;
