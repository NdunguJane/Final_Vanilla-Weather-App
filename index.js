let apiKey = "28t4boad8ba39864f1579209a00b107e";

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);

  return date.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
        <div class="forecast-day">
          <div>${formatDay(day.time)}</div>

          <img src="${day.condition.icon_url}" />

          <div class="forecast-temp">
            <strong>${Math.round(day.temperature.maximum)}°</strong>
          </div>

          <div>${Math.round(day.temperature.minimum)}°</div>
        </div>
      `;
    }
  });

  document.querySelector("#forecast").innerHTML = forecastHTML;
}

function getForecast(city) {
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(forecastUrl).then(displayForecast);
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
    `<img src="${response.data.condition.icon_url}" />`;

  document.querySelector("#current-date-time").innerHTML = formatDate(
    response.data.time,
  );

  getForecast(city);
}

function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");

  searchCity(cityInput.value);
}

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", handleSearch);

searchCity("Nairobi");
