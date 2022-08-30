const axios = require("axios");

const checkError = (error) => {
  if (error.response) {
    // Request made and server responded
    return `"Error 💥 ", ${error.response.status} `;
  } else if (error.request) {
    // The request was made but no response was received
    return `💥 The request to URL "${url}" was made but no response was received 💥`;
  } else {
    // Something happened in setting up the request that triggered an Error
    return `"Error 💥 : ${error.message}`;
  }
};

const getGeocode = async (url, callback) => {
  try {
    const res = await axios.get(url);

    if (res.data?.success === false) throw new Error(res.data.error.code);

    callback(undefined, res.data);
  } catch (error) {
    callback(checkError(error), undefined);
  }
};

module.exports = getGeocode;
