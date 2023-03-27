// global variables
var currentWeatherEl = document.querySelector("#current-weather");
var currentTempInput = document.querySelector("#current-temp");
var currentWindInput = document.querySelector("#current-wind");
var currentHumidityInput = document.querySelector("#current-humidity");
var currentIconInput = document.querySelector("#current-icon");
var cityNameInput = document.querySelector("#searched-city");
var searchBtn = document.querySelector("#search-btn");
var currentHeader = document.querySelector("#current-header");
var forecastContainerEl = document.querySelector("#forecast-container");
var fiveDayEl = document.querySelector(".five-day");
var forecastHeaderEl = document.querySelector(".forecastHeader");
var historyList = document.querySelector(".history-container");
historyList.textContent = "Search History";

// show forecast header
var renderForecastHeader = function () {
  var forecastHeading = document.createElement("h4");
  forecastHeading.textContent = "5 Day Forecast";
  forecastHeaderEl.append(forecastHeading);
};

// show 5 day forecast
var renderForecast = function (data) {
  // converts each forecast into var arr
  renderForecastHeader();
  var arr = data.list;
  for (var i = 0; i < arr.length; i++) {
    // splitting the array so you can only see each day at 12
    if (arr[i].dt_txt.split(" ")[1] === "12:00:00") {
      // putting api forecast info on page
      var fiveDay = document.createElement("div");
      forecastContainerEl.append(fiveDay);
      var fiveDayCard = document.createElement("ul");
      fiveDay.append(fiveDayCard);
      var time5El = document.createElement("li");
      var temp5El = document.createElement("li");
      var wind5El = document.createElement("li");
      var humidity5El = document.createElement("li");
      var icon5El = document.createElement("img");
      time5El.textContent = arr[i].dt_txt;
      var icon5 = arr[i].weather[0].icon;
      icon5El.setAttribute(
        "src",
        "http://openweathermap.org/img/w/" + icon5 + ".png"
      );
      temp5El.textContent = "temp: " + arr[i].main.temp + "°F";
      wind5El.textContent = "wind: " + arr[i].wind.speed + "MPH";
      humidity5El.textContent = "humidity: " + arr[i].main.humidity + "%";
      fiveDayCard.style.border = "2px solid navy";
      fiveDayCard.style.display = "inline-block";
      fiveDayCard.style.backgroundColor = "navy";
      fiveDayCard.style.color = "white";
      fiveDayCard.style.margin = "5px";
      fiveDayCard.append(time5El);
      fiveDayCard.append(temp5El);
      fiveDayCard.append(wind5El);
      fiveDayCard.append(humidity5El);
      fiveDayCard.append(icon5El);
    }
  }
};

// show current weather on screen
var renderCurrentWeather = function (data) {
  // for loop to run through all data
  for (var i = 0; i < data.list.length; i++) {
    // shortcuts to all api categories
    var temp = data.list[i].main.temp;
    var wind = data.list[i].wind.speed;
    var humidity = data.list[i].main.humidity;
    var time = dayjs().format("M/D/YYYY");
    var icon = data.list[i].weather[0].icon;

    // putting api weather info on page
    currentHeader.textContent = cityNameInput + " " + time;
    currentIconInput.setAttribute(
      "src",
      "http://openweathermap.org/img/w/" + icon + ".png"
    );
    currentTempInput.textContent = "temp: " + temp + "°F";
    ("F");
    currentWindInput.textContent = "wind: " + wind + "MPH";
    currentHumidityInput.textContent = "humidity: " + humidity + "%";
    currentWeatherEl.classList.add("currentContainer");
  }
};

var renderLatLon = function (data) {
  var latInput = data[0].lat;
  var lonInput = data[0].lon;
  // api fetch request to get weather data
  var fetchWeather = function () {
    var lat = latInput;
    var lon = lonInput;
    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=b89c09787bf9106df63088418a47c76b&units=imperial";
    fetch(forecastURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        renderCurrentWeather(data);
        renderForecast(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  fetchWeather();
};

// api fetch request to get city name input
var fetchCity = function () {
  cityNameInput = cityNameInput.value;
  var cityURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityNameInput +
    "&limit=1&appid=b89c09787bf9106df63088418a47c76b";
  fetch(cityURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderLatLon(data);
    })
    .catch(function (err) {
      console.log(err);
    });
};

// call functions on click and collect user input for api/local storage
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var searchValue = cityNameInput.value;
  fetchCity();
  setSeachedHistory(searchValue);
  getSearchedHistory(searchValue);
});

// receive local storage and apply to page
var getSearchedHistory = function () {
  var localHistory = JSON.parse(localStorage.getItem("searchedCities")) || [];
  for (var i = 0; i < localHistory.length; i++) {
    var searchTerm = localHistory[i];
    var newLi = document.createElement("button");
    newLi.textContent = searchTerm;
    newLi.classList.add("btn");
    newLi.classList.add("searchbtn");
    newLi.style.display = "block";
    historyList.appendChild(newLi);
    newLi.addEventListener("click", function () {
      var searchValue = searchTerm;
      fetchCity(searchValue)
    })
  }
};

// set up local storage keys
var setSeachedHistory = function (text) {
  var searchBarHistory =
    JSON.parse(localStorage.getItem("searchedCities")) || [];
  searchBarHistory.push(text);
  localStorage.setItem("searchedCities", JSON.stringify(searchBarHistory));
};
