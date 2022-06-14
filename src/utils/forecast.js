const request = require("request");

const forecast = (lat, lon, callback) => {
  const options = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/weather",
    qs: {
      lat,
      lon,
      units: "metric",
    },
    headers: {
      "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
      "X-RapidAPI-Key": "c24bc235d4msh869f2d10b61cd8dp16cc4bjsnc51b46a4b6c3",
      useQueryString: true,
    },
    json: true,
  };

  request(
    options,
    (
      error,
      {
        body: {
          name,
          main: {
            temp: temperature,
            feels_like: feelsLike,
            temp_min: min,
            temp_max: max,
          },
          error: bodyError,
        },
        body,
      }
    ) => {
      if (error)
        return callback(`Unable to connect to weather services!`, undefined);

      if (bodyError)
        return callback(
          `Unable to find location, try another search`,
          undefined
        );

      const iconsGenerator = function (temp) {
        return temp < 15 ? "🥶" : temp < 25 ? "⛅" : "🔆";
      };

      const msg = `You are viewing the ${name} weather forcast. It is currently ${temperature} degrees out, but it feels like ${feelsLike} degrees ${iconsGenerator(
        feelsLike
      )}. During the course of the day the temperature could rise to ${max} degrees ${iconsGenerator(
        max
      )} and dip to ${min} degrees ${iconsGenerator(min)}.`;

      callback(undefined, msg);
    }
  );
};

module.exports = forecast;
