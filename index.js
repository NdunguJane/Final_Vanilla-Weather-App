let apiKey = "28t4boad8ba39864f1579209a00b107e";

const cityTimeZones = {
  Nairobi: "Africa/Nairobi",
  Paris: "Europe/Paris",
  Lisbon: "Europe/Lisbon",
  London: "Europe/London",
};

function formatDate(timeZone) {
  let now = new Date();

  return now.toLocaleString("en-US", {
    timeZone: timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function displayWeather(response) {
  let city = response.data.city;

  document.querySelector("#city-name").innerHTML = city;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current,
  );

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed,
  );

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like,
  );

  document.querySelector("#weather-icon").innerHTML =
    `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.description}" />`;

  let timeZone = cityTimeZones[city];

  if (timeZone) {
    document.querySelector("#current-date-time").innerHTML =
      formatDate(timeZone);
  } else {
    document.querySelector("#current-date-time").innerHTML =
      new Date().toLocaleString();
  }
}

function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");

  searchCity(cityInput.value);
}

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Nairobi");




