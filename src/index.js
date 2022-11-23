//To Display the Current Time and Day
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
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

let currentDateTime = document.querySelector(".current-date-time");
currentDateTime.innerHTML = `${day} ${hours}:${minutes}`;

//For the Search Engine
function searchForm(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let currentCity = document.querySelector(".current-city");
  if (searchCity.value) {
    currentCity.innerHTML = `${searchCity.value}`;
  } else {
    currentCity.innerHTML = null;
    alert("Please type a city");
  }
  let city = document.querySelector(".city").value;
  getCityTemp(city);
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", searchForm);

function getCityTemp(city) {
  let unit = "imperial";
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCityTemp);
}

function showCityTemp(response) {
  let searchCityTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = `Currently ${searchCityTemp}°F`;
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = response.data.name;
}
//For Current Location Button
function showPosition(position) {
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = "imperial";
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `${apiEndpoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityTemp);
}

function displayPositionWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector(".current-location");
button.addEventListener("click", displayPositionWeather);
