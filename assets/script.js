var APIKey = "54374761b115880386522bedb63f1a22";
var searchHistory = [];
var city;
var today = $("#today");
var forecast = $("#forecast");
var date = moment().format("MM/DD/YYYY");

//wrap repeated code for displaying today's weather in a function
function displayWeatherData(response) {
  var celsiusTemp = "Temp: " + (response.main.temp - 273.15).toFixed(2) + "°C";
  var windSpeed = "Wind: " + response.wind.speed + " KPH";
  var humidity = "Humidity " + response.main.humidity + "%";
  var todayCard = $("<div>").addClass("card bg-light border-dark");
  var todayCardBody = $("<div>").addClass("card-body text-dark p-2");
  var weatherIconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
  var iconContainer = $("<div id='weather-icon'>").html("<img src='" + weatherIconUrl + "' alt='Weather Icon'>");
  var todayDateDisplay = $("<h5>").text(response.name + " (" + date + ")");
  todayCardBody.append(todayDateDisplay);
  todayCardBody.append(iconContainer);
  todayCardBody.append("<p>" + celsiusTemp + "</p>");
  todayCardBody.append("<p>" + windSpeed + "</p>");
  todayCardBody.append("<p>" + "Humidity: " + humidity + "</p>");
  todayCard.append(todayCardBody);
  today.empty();
  today.append(todayCard);
  displayForecast(response.id);
}

$("#search-button").on("click", function(event) {
  event.preventDefault();
  city = $("#search-input").val().trim();
  if (!city) {
    return;
  }
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(displayWeatherData);

  searchHistory.push(city);
  $("#search-input").val("");
  renderButtons();
});

function renderButtons() {
   $(".list-group").empty();
   for (var i = 0; i < searchHistory.length; i++) {
     var a = $("<button>");
     a.addClass("city btn-secondary");
     a.attr("data-name", searchHistory[i]);
     a.text(searchHistory[i]);
     $(".list-group").append(a);
   }
 }
 
 $(document).on("click", ".city", function() {
   var city = $(this).attr("data-name");
   var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(displayWeatherData);
   });
 
 renderButtons();

// Function to display the five-day weather forecast
function displayForecast(cityID) {
  var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
  $.ajax({
    url: forecastURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    forecast.empty();
    //OpenWeatherMap API provides weather data in 3 hour increments, and 24/3 = 8;
    //therefore, I'm incrementing by 8 to skip to the next day's forecast:
    today.append("<br>"+"<h4>"+"5-Day Forecast:"+"</h4>");
    for (var i = 1; i < response.list.length; i+=8) {
      var forecastDate = moment(response.list[i].dt_txt).add(1, 'days').format("MM/DD/YYYY");
      var forecastTemp = (response.list[i].main.temp - 273.15).toFixed(2) + "°C";
      var forecastHumidity = response.list[i].main.humidity + "%";
      var forecastWind = response.list[i].wind.speed + " KPH"
      var forecastCard = $("<div>").addClass("card col-md-2 ml-4 text-white forecast-info");
      var forecastCardBody = $("<div>").addClass("card-body p-2");
      var weatherIconUrl = "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
      var iconContainer = $("<div id='weather-icon'>").html("<img src='" + weatherIconUrl + "' alt='Weather Icon'>");
      var forecastDateDisplay = $("<h5>").text(forecastDate);
      forecastCardBody.append(forecastDateDisplay);
      forecastCardBody.append(iconContainer);
      forecastCardBody.append("<p>" + "Temp: "+ forecastTemp + "</p>");
      forecastCardBody.append("<p>"+ "wind: "+ forecastWind + "</p>");
      forecastCardBody.append("<p>" + "Humidity: " + forecastHumidity + "</p>");
      forecastCard.append(forecastCardBody);
      forecast.append(forecastCard);
    }
  });
}

