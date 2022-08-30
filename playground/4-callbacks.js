const names = ["Ammar", "ahmed", "yamen"];

const shortNames = names.filter((name) => {
  return name.length <= 4;
});

const geocode = (address, clgbk) => {
  setTimeout(() => {
    const data = { lat: 0, long: 0 };

    clgbk(data);
  }, 2000);
};

const data = geocode("Egypt", (data) => {
  console.log(data);
});
