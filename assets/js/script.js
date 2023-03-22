// global variables
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=b89c09787bf9106df63088418a47c76b";
// var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=b89c09787bf9106df63088418a47c76b"
var resultsEl = document.querySelector('#results-container');
var searchEl = document.querySelector('#search-container');
var historyEl = document.querySelector('#history');
var currentWeatherEl = document.querySelector('#current-weather');
var futureForecastEl = document.querySelector('#future-forecast');
var currentDateEl = document.querySelector('#current-date');
var currentTempEl = document.querySelector('#current-temp');
var currentWindEl = document.querySelector('#current-wind');
var currentHumidityEl = document.querySelector('#current-humidity');
var currentIconEl = document.querySelector('#current-icon');
var searchedCity = document.querySelector('#searched-city');





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

// show current weather on screen
var renderCurrentWeather = function(data) {
    // for loop to run through all data
    for (var i = 0; i < data.list.length; i++) {
    // shortcuts to all api categories
    var list = data.list[i];
    var temp = data.list[i].main.temp;
    var wind = data.list[i].wind.speed;
    var humidity = data.list[i].main.humidity;
    // var icon = data.list[i].weather[0].icon;

    // putting api weather info on page
    // currentIconEl.innerHTML = icon;
    currentDateEl.textContent = "dayjs().format('DD/MM/YYYY')";
    currentTempEl.textContent = "temp: " + temp; "F";
    currentWindEl.textContent = "wind: " + wind + "MPH";
    currentHumidityEl.textContent = "humidity: " + humidity + "%";
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
    })  
    .catch(function (err) {
        console.log(err);
    })
};


fetchWeather();
// renderWeather();

// date / .dt_txt
// temp F /  .main.temp
// wind mph / .wind.speed
// humdity % / .main.humidity
// icon / 