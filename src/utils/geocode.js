const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibWFuZGVlcHNhaW5pMjEwMSIsImEiOiJja251NDZ6dGMwOWIzMm5wc2ZndGR3OGx3In0.VsE_O9N7N0gojxMciAF-AQ&limit=1";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to service", undefined);
    } else if (response.body.features.length === 0) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
