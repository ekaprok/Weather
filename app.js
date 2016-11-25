const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
      }
    });
  }
});

// weather.getWeather(LAT, LNG, (errorMessage, weatherResults) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log(JSON.stringify(weatherResults, undefined, 2));
//   }
// });




// const request = require('request');
//
// const geocode = require('./geocode/geocode');
//
// const argv = yargs
//   .options({
//     a: {
//       demand: true,
//       alias: 'address',
//       describe: 'Address to fetch weather for',
//       string: true
//     }
//   })
//   .help()
//   .alias('help', 'h')
//   .argv;
//
// var encodedAddress = encodeURIComponent(argv.address);
//
// request({
//   url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
//   json: true
// }, (error, response, body) => {
//   if (error) {
//     console.log('Unable to connect to Google servers.');
//   } else if (body.status === 'ZERO_RESULTS') {
//     console.log('Unable to find that address.');
//   } else if (body.status === 'OK') {
//     console.log(`Address: ${body.results[0].formatted_address}`);
//     console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
//     console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
//   }
// });
