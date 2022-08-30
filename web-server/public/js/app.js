console.log("Loaded from the server!");

const qryBtn = document.querySelector("#qryBtn");
const messagage1 = document.querySelector("#message-1");
const messagage2 = document.querySelector("#message-2");
const searchForm = document.querySelector("#searchForm");
const searchBox = document.querySelector("#searchBox");

const getData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Not found 💥");
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

qryBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    messagage1.textContent = "Loading...";
    messagage1.textContent = "";

    const { latitude, longitude } = pos.coords;

    try {
      const data = await getData(
        `http://localhost:3000/weather?lat=${latitude}&long=${longitude}`
      );
      messagage1.textContent = data.allData.name;
      messagage2.textContent = `The Weather Today: ${data.weather}`;
    } catch (error) {
      messagage1.textContent = error;
      messagage2.textContent = ``;
    }
  });
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = searchBox.value;
  messagage1.textContent = "Loading...";
  messagage1.textContent = "";

  (async () => {
    try {
      const data = await getData(`http://localhost:3000/weather?q=${text}`);
      messagage1.textContent = data.allData.name;
      messagage2.textContent = `The Weather Today: ${data.weather}`;
    } catch (error) {
      messagage1.textContent = error;
      messagage2.textContent = ``;
    }
  })();
});
