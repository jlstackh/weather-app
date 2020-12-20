//DOM variables
const newCityButton = document.querySelector("#changeCity");
const modal = document.querySelector(".modal");
let highTempText = document.querySelectorAll(".high");
let lowTempText = document.querySelectorAll(".low");
let degreeUnit = document.querySelectorAll(".degreeUnit");
let twoDayTitle = document.querySelector("#twoDayTitle");
let threeDayTitle = document.querySelector("#threeDayTitle");
let modalContent = document.querySelector(".modalContent");
let cityList = document.querySelector("#cityArray");
const cloud1 = document.querySelector("#cloud1");
const searchTextBox = document.querySelector("#searchTextBox");
const searchButton = document.querySelector("#searchButton");
const windSpeed = document.querySelector("#windSpeed");
const humidity = document.querySelector("#humidity");
const weatherDescription = document.querySelector("#weatherDescription");
const weatherIcon = document.querySelector("#weatherIcon");
let tempValue = [];

function showSearch() {
  console.log(searchTextBox.value);
}
searchButton.addEventListener("click", function () {
  city = searchTextBox.value.toLowerCase();
  document.querySelector("#placeTempHead").innerHTML = city;
  apiRequest();
});
//data variables
let units = "imperial";
let city = "greensboro";
let date = new Date();
let todayIndex = date.getDay();
const weatherAPIKey = "d9646d4c5ddbe1f1d542842fe530e8bf";

let weatherData = new Object();
const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const cities = [
  "Greensboro",
  "Raleigh",
  "Wilmington",
  "New York",
  "London",
  "Tokyo",
  "Paris",
];

//run all functions required to populate the page with data
window.onload = apiRequest;

function apiRequest() {
  let currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=${units}`;
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherAPIKey}&units=${units}`;
  if (!(city in weatherData)) {
    weatherData[city] = [];
    axios.get(currentURL).then(getWeatherInfo);
    axios.get(forecastURL).then(getWeatherInfo).then(setCityData);
  } else {
    setCityData();
  }
}

function getWeatherInfo(response) {
  weatherData[city].push(response.data);
}

function setCityData() {
  windSpeed.textContent = weatherData[city][0].wind.speed;
  humidity.textContent = weatherData[city][0].main.humidity;
  weatherDescription.textContent = weatherData[city][0].weather[0].description;
  weatherIcon.src = `http://openweathermap.org/img/wn/${weatherData[city][0].weather[0].icon}@2x.png`;
  document.querySelector("#placeTempHead").innerHTML = city;

  document.querySelector("#currentTemp").innerHTML = Math.round(
    weatherData[city][0].main.temp
  );
  document.querySelector("#highCurrent").innerHTML = Math.round(
    weatherData[city][0].main.temp_max
  );

  document.querySelector("#lowCurrent").innerHTML = Math.round(
    weatherData[city][0].main.temp_min
  );

  document.querySelector("#tomorrowHigh").innerHTML = Math.round(
    weatherData[city][1].list[6].main.temp_max
  );

  document.querySelector("#tomorrowLow").innerHTML = Math.round(
    weatherData[city][1].list[6].main.temp_min
  );

  document.querySelector("#twoDayHigh").innerHTML = Math.round(
    weatherData[city][1].list[14].main.temp_min
  );

  document.querySelector("#twoDayLow").innerHTML = Math.round(
    weatherData[city][1].list[14].main.temp_min
  );

  document.querySelector("#threeDayHigh").innerHTML = Math.round(
    weatherData[city][1].list[22].main.temp_max
  );

  document.querySelector("#threeDayLow").innerHTML = Math.round(
    weatherData[city][1].list[22].main.temp_min
  );

  tempValue = document.querySelectorAll(".tempValue");
}

function changeUnits() {
  if (units === "imperial") {
    units = "metric";
    tempValue.forEach((value) => {
      let i = value.innerHTML;
      i =
        ((i - 32) * (5 / 9) > -1 || -1) *
        Math.round(Math.abs((i - 32) * (5 / 9)));
      value.innerHTML = i;
    });
    degreeUnit.forEach((p) => {
      p.innerHTML = "°C";
    });
  } else {
    units = "imperial";
    degreeUnit.forEach((q) => {
      q.innerHTML = "°F";
    });
    setCityData();
  }
}

//finds idex of next two days
function futureWeekDay(numOfDays) {
  let totalDayIndex = todayIndex + numOfDays;
  if (totalDayIndex >= 7) {
    return totalDayIndex % 7;
  } else {
    return totalDayIndex;
  }
}

//assigns days of week to future days
twoDayTitle.textContent = week[futureWeekDay(2)];
threeDayTitle.textContent = week[futureWeekDay(3)];

selectionElement.addEventListener("click", function () {
  document.querySelector("#placeTempHead").innerHTML = item;
  console.log(item.toLowerCase());
  city = item.toLowerCase();
  apiRequest();
});

function populateModal(item) {
  let selectionElement = document.createElement("p");
  let textElement = document.createTextNode(item);
  selectionElement.appendChild(textElement);
  selectionElement.name = "cities";
  cityList.appendChild(selectionElement);
  selectionElement.addEventListener("click", function () {
    document.querySelector("#placeTempHead").innerHTML = item;
    console.log(item.toLowerCase());
    city = item.toLowerCase();
    apiRequest();
    modal.style.display = "none";
  });
}

for (let i = 0; i < cities.length; i++) {
  populateModal(cities[i]);
}

//displays city selection modal
newCityButton.addEventListener("click", function () {
  modal.style.display = "block";
});

//close city selection modal
function closeModal() {
  if (event.target == modalContent) {
    return;
  }
  modal.style.display = "none";
}
