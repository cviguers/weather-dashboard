// global variables
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=b89c09787bf9106df63088418a47c76b";
var cityURL = "http://api.openweathermap.org/geo/1.0/direct?q=Charlotte&limit=5&appid=b89c09787bf9106df63088418a47c76b";
var resultsEl = document.querySelector('#results-container');
var searchEl = document.querySelector('#search-container');
var historyEl = document.querySelector('#history');
var currentWeatherEl = document.querySelector('#current-weather');
var futureForecastEl = document.querySelector('#future-forecast');
var currentDateInput = document.querySelector('#current-date');
var currentTempInput = document.querySelector('#current-temp');
var currentWindInput = document.querySelector('#current-wind');
var currentHumidityInput = document.querySelector('#current-humidity');
var currentIconInput = document.querySelector('#current-icon');

var cityNameInput = document.querySelector('#searched-city')




// get local storage for  previously searched towns on page load
// var getSearchedWeather = function () {
//     return JSON.parse(localStorage.getItem('searchedWeather')) || [];
// };

// // set key to collect searches
// var setSearchedWeather = function(text) {
//     var searchedWeather = getSearchedWeather();
//     searchedWeather.push(text);
//     localStorage.setItem('searchedWeather', JSON.stringify(searchedWeather));
// };

// show 5 day forecast
var renderForecast = function(data) {
    for (var i = 0; i < data.length; i++) {
        console.log(data.[0]);
    // shortcuts to all api categories
    // var list = data.list[i];
    // var temp = data.list[i].main.temp; 
    // var wind = data.list[i].wind.speed;
    // var humidity = data.list[i].main.humidity;
    // var time = ;
    // var icon = data.list[i].weather.icon;
        var forecastCardEl = document.createElement('section');
        forecastCardEl = 
        futureForecastEl.appendChild(forecastCardEl);
    };
};

// show current weather on screen
var renderCurrentWeather = function(data) {
    // for loop to run through all data
    for (var i = 0; i < data.list.length; i++) {
    // shortcuts to all api categories
    var list = data.list[i];
    var temp = data.list[i].main.temp; 
    var wind = data.list[i].wind.speed;
    var humidity = data.list[i].main.humidity;
    var time = dayjs().format('M/D/YYYY');
    var icon = data.list[i].weather.icon;

    // putting api weather info on page
    // currentWeatherEl.textContent = searchedCityInput;
    currentIconInput.textContent = icon;
    currentDateInput.textContent = time;
    currentTempInput.textContent = "temp: " + temp; "F";
    currentWindInput.textContent = "wind: " + wind + "MPH";
    currentHumidityInput.textContent = "humidity: " + humidity + "%";
}
};

// api fetch request to get weather data
var fetchWeather = function () {
  fetch (forecastURL)
    .then(function (response) {
        return response.json();
    }) 
    .then (function (data) {
        // setSearchedWeather(data);
        renderCurrentWeather(data);
        renderForecast(data);
    })  
    .catch(function (err) {
        console.log(err);
    })
};

var fetchCity = function() {
fetch(cityURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
})
};


fetchWeather();
fetchCity();