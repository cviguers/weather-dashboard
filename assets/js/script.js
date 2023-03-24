// global variables
var currentWeatherEl = document.querySelector('#current-weather');
var futureForecastEl = document.querySelector('#future-forecast');
var currentTempInput = document.querySelector('#current-temp');
var currentWindInput = document.querySelector('#current-wind');
var currentHumidityInput = document.querySelector('#current-humidity');
var currentIconInput = document.querySelector('#current-icon');
var cityNameInput = document.querySelector('#searched-city');
var searchBtn = document.querySelector('#search-btn');
var currentHeader = document.querySelector('#current-header')

// show 5 day forecast
var renderForecast = function(data) {
    // converts each forecast into var arr
    var arr = data.list;
    for (var i = 0; i < arr.length; i++) {
        
        // splitting the array so you can only see each day at 12
        if (arr[i].dt_txt.split(' ')[1] === '12:00:00') {
            // putting api forecast info on page
            var temp5El = document.createElement('p');
            var wind5El = document.createElement('p');
            var humidity5El = document.createElement('p');
            temp5El.textContent = "temp: " + arr[i].main.temp + "F";
            wind5El.textContent = "wind: " +  arr[i].wind.speed + "MPH";
            humidity5El.textContent = "humidity: " +  arr[i].main.humidity + "%";
            var icon5 = arr[i].weather[0].icon;
            var icon5El = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + icon5 + '.png');
            futureForecastEl.append(temp5El);
            futureForecastEl.append(wind5El);
            futureForecastEl.append(humidity5El);
            // futureForecastEl.append(icon5El);
            futureForecastEl.classList.add("forecast-style")
        }
    };
};

// show current weather on screen
var renderCurrentWeather = function(data) {
    // for loop to run through all data
    for (var i = 0; i < data.list.length; i++) {
    // shortcuts to all api categories
    var temp = data.list[i].main.temp; 
    var wind = data.list[i].wind.speed;
    var humidity = data.list[i].main.humidity;
    var time = dayjs().format('M/D/YYYY');
    var icon = data.list[i].weather.icon;

    // putting api weather info on page
    currentHeader.textContent = cityNameInput + " " + time;
    currentIconInput.textContent = icon;
    currentTempInput.textContent = "temp: " + temp; "F";
    currentWindInput.textContent = "wind: " + wind + "MPH";
    currentHumidityInput.textContent = "humidity: " + humidity + "%";
    currentWeatherEl.classList.add("currentContainer")
    }
};

var toJSON = function (response) {
    return response.json();
};

var renderLatLon = function (data) {
    var latInput = data[0].lat;
    var lonInput = data[0].lon;
    // api fetch request to get weather data
    var fetchWeather = function () {
        var lat = latInput
        var lon = lonInput
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon +"&appid=b89c09787bf9106df63088418a47c76b";
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
    fetchWeather()
};

// api fetch request to get city name input
var fetchCity = function() {
    cityNameInput = cityNameInput.value
    var cityURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityNameInput + "&limit=1&appid=b89c09787bf9106df63088418a47c76b";
    fetch(cityURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        renderLatLon(data);
    })
    .catch(function (err) {
        console.log(err);
    })
};

// get local storage for  previously searched towns on page load
var getSearchedWeather = function () {
    return JSON.parse(localStorage.getItem('searchedWeather')) || [];
};

// set key to collect searches
var setSearchedWeather = function(text) {
    var searchedWeather = getSearchedWeather();
    searchedWeather.push(text);
    localStorage.setItem('searchedWeather', JSON.stringify(searchedWeather));
};

searchBtn.addEventListener('click', fetchCity)