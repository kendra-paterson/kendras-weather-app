let now = new Date();
console.log(now);
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, "0");

  let currentDate = document.querySelector(".weekday");
  currentDate.innerHTML = `${day} ${hours}:${minutes}`;
}
formatDate(now);

function citySearch(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  searchCity(input.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", citySearch);

function convertToCel(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-value");

  temperatureElement.innerHTML = 19;
}

function convertToFah(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-value");

  temperatureElement.innerHTML = 66;
}

let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", convertToFah);

let celsiusLink = document.querySelector("#c-link");
celsiusLink.addEventListener("click", convertToCel);

function showWeather(response) {
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = `${temperature}`;
  let iconElement = document.querySelector("icon");
  iconElement.setAttribute(
    "weather-emoji",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
console.log(response.data);
function searchCity(city) {
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function showPosition(position) {
  let apiKey = "f81614abe2395d5dfecd45b9298041de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let newButton = document.querySelector("#current-button");
newButton.addEventListener("click", getPosition);
