// global variables
var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={b89c09787bf9106df63088418a47c76b}';
var locationURL = ''
var weatherEl = document.querySelector('#weather');
var buttonsEl = document.querySelector('#buttons');

var displayWeather = function (text) {
    weatherEl.textContent = text;
};

var renderButtons = function() {
    var searchedWeather = getSearchedWeather();
    for (var i = 0; i < searchedWeather.length; i++) {
        var button = document.createElement('button');
        button.textContent = searchedWeather[i].weather;
        button.dataset.id = searchedWeather[i].id;
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

var toJSON = function (response) {
    return response.json();
};

// var renderLocation = function (data) {
//     // RENDER IMAGE
// };

var renderWeather = function (data) {
// TODO: DO SOMETHINGcreate/append
    getLocation(data.name);
};


var fetchWeather = function () {
  fetch (weatherURL, {
          headers: {
            Accept: "application/json",
          },
        })
      .then(toJSON);
      .then(renderWeather);
  };





    // .then(function (response) {
    //     return response.json();
    // }) 
    // .then (function (data) {
    //     displayWeather(data.weather);
    //     setSearchedWeather(data);
    // })
    // .catch(function (err) {
    //     console.log(err);
    // })



fetchWeather();