const calcTip = (total, tipPercent = 0.25) => total + total * tipPercent;

const fahrenhiteToCelsius = (temp) => (temp - 32) / 1.8;

const celsiusToFagrenhite = (temp) => temp * 1.8 + 32;

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) reject("Numbers must be greater than 0!");
      resolve(a + b);
    }, 200);
  });
};

module.exports = { calcTip, fahrenhiteToCelsius, celsiusToFagrenhite, add };
