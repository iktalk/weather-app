let now = new Date();
let h2 = document.querySelector("#current-date");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
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
h2.innerHTML = `${day} ${hours}:${minutes}`;

let changeTemp = document.querySelector("#celsius-link");
let currentTemp = document.querySelector("#current-temp");
changeTemp.addEventListener("click", function (event) {
  event.preventDefault();
  currentTemp.innerHTML = "18";
});

let changeFahrenheitTemp = document.querySelector("#fahrenheit-link");
let currentFahrenheitTemp = document.querySelector("#current-temp");
changeFahrenheitTemp.addEventListener("click", function (event) {
  event.preventDefault();
  currentFahrenheitTemp.innerHTML = "36";
});

function showTemperature(response) {
  console.log(response.data);

  let city = response.data.name;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = `${city}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${temperature}`;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#current-wind");
  windSpeedElement.innerHTML = `Wind: ${windSpeed} km/h`;
}

function searchCity(city) {
  let apiKey = "ceb85c7e88b87ff60bd3e2793c0afe79";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function citySubmission(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar-input").value;
  searchCity(city);
}

function retrieveCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "ceb85c7e88b87ff60bd3e2793c0afe79";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveCurrentPosition);
}

let searchHere = document.querySelector("#search-form");
searchHere.addEventListener("submit", citySubmission);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Toronto");
