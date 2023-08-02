const postman_request = require('postman-request');

module.exports.foreCast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=028fcff569059ab2f358fe685d3e65f6&query=' +
    latitude +
    ',' +
    longitude +
    '&units=m';

  postman_request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined);
    } else if (body.error) {
      callback('Unable to find the location', undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. Humidity is ${body.current.humidity}% period.`
      );
    }
  });
};
