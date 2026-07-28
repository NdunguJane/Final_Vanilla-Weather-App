let apiKey = "28t4boad8ba39864f1579209a00b107e";

function formatDate(timestamp, timezone) {
  let localDate = new Date((timestamp + timezone) * 1000);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[localDate.getUTCDay()];
  let month = months[localDate.getUTCMonth()];
  let date = localDate.getUTCDate();
  let year = localDate.getUTCFullYear();

  let hours = localDate.getUTCHours();
  let minutes = localDate.getUTCMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${month} ${date}, ${year} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getUTCDay()];
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 7) {
      forecastHTML += `
        <div class="forecast-day">
          <div class="forecast-date">${formatDay(day.time)}</div>

          <img
            src="${day.condition.icon_url}"
            alt="${day.condition.description}"
          />

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
  console.log(response.data);

  document.querySelector("#city-name").innerHTML = response.data.city;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );

  document.querySelector("#weather-icon").innerHTML = `
    <img
      src="${response.data.condition.icon_url}"
      alt="${response.data.condition.description}"
    />
  `;

  document.querySelector("#current-date-time").innerHTML = formatDate(
    response.data.time,
    response.data.timezone
  );

  getForecast(response.data.city);
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
