const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places//${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidHJhY2tpbmd0aGVzdW4iLCJhIjoiY2wzbHRrNG0xMDVxMjNjcGI2N3ZhZzJ3MiJ9.sfszLm6uf0i0aDhNm5AQxA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    try {
      if (error)
        return callback(`Unable to connect to location services!`, undefined);

      if (body.features.length === 0)
        return callback(
          `Unable to find location, try another search`,
          undefined
        );

      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    } catch (err) {
      console.log(err.message);
    }
  });
};

module.exports = geocode;
