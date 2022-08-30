const getGeocode = require("./utils/geocode");
const getWeatherForcast = require("./utils/getWeatherForcast");
const geolocationURL = "https://ipapi.co/json";

getGeocode(geolocationURL, async (error, { latitude, longitude } = {}) => {
  if (error) return console.log(error);

  await getWeatherForcast(latitude, longitude, (err, forcastData) => {
    if (error) return console.log(err);
    console.log(latitude, longitude);
    console.log(forcastData?.weather[0]?.description);
  });
});
