const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=0faf30977145da8ae8f54e9595c9198c&query=" +
    latitude +
    "," +
    longitude;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("cannot get to the service");
    } else if (response.body.error) {
      callback("cannot find the given location");
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions[0] +
          " it is currently " +
          response.body.current.temperature +
          " degrees out.there is a " +
          response.body.current.precip +
          " chance of precipitation"
      );
    }
  });
};
module.exports = forecast;
