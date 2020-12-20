const temperatureElement = document.querySelector("#temp");
const cityNameElement = document.querySelector("#cityG");
const cityInput = document.querySelector("#searchContent");

function showTemperature(response) {
  console.log("response.data", response.data);
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = temperature;
  cityNameElement.innerHTML = response.data.name;
}

function searchCity(event) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let newCity = cityInput.value;
  let apiKey = "d9646d4c5ddbe1f1d542842fe530e8bf";
  let units = "imperial";
  let url = `${apiEndpoint}?q=${newCity}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showTemperature).catch(console.log);
}

// let citySubmit = document.querySelector("#searchButton");
document.addEventListener("submit", searchCity);
