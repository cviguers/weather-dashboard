// global variables
var apiURL = 'http://api.openweathermap.org/geo/1.0/direct?q= '' q '' &limit=5&appid={b89c09787bf9106df63088418a47c76b}'; //https://openweathermap.org/forecast5 
var weatherEl = document.querySelector('#weather');
var buttonsEl = document.querySelector('#buttons');

var displayWeather = function (text) {
    weatherEl.textContent = text;
};

var renderButtons = function() {
    var searchedPoke = getSearchedWeather();
    for (var i = 0; i < searchedWeather.length; i++) {
        var button = document.createElement('button');
        button.textContent = searchedWeather[i].//result weather?;
        button.dataset.id = searchedWeather[i].//result id?;
        
    }
};

var getSearchedWeather = function () {
    return JSON.parse(localStorage.getItem('searchedWeather')) || [];
};

var setSearchedWeather = function(text) {
    var searchedWeather = getSearchedWeather();
    searchedWeather.push(text);
    localStorage.setItem('searchedWeather', JSON.stringify(searchedWeather));
};


var getWeather = function () {
  fetch (apiURL)
    .then(function (response) {
        return response.json();
    }) 
    .then (function (data) {
        displayWeather(data.weather);
        setSearchedWeather(data);
    })
    .catch(function (err) {
        console.log(err);
    })
};


getWeather();