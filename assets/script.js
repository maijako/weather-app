var APIKey = "54374761b115880386522bedb63f1a22";
var searchHistory = [];
var city;
var today = $("#today");
var forecast = $("#forecast");
var date = moment().format("MM/DD/YYYY");

$("#search-button").on("click", function(event) {
  event.preventDefault(); 
  city = $("#search-input").val().trim();
  if (!city) {
    return;
  }
//an ajax call to display today's weather data
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var weatherIconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    var iconContainer = $("<div id='weather-icon'>").html("<img src='" + weatherIconUrl + "' alt='Weather Icon'>");

    var celsiusTemp = "Temp: "+(response.main.temp - 273.15).toFixed(2)+"°C";
    var windSpeed = "Wind: "+response.wind.speed+" KPH";
    var humidity = "Humidity "+response.main.humidity+"%";
    today.html(response.name+" ("+date+") "+"</br>"+ celsiusTemp + "</br>"+ windSpeed + "</br>"+ humidity);
    today.append(iconContainer);
    displayForecast(response.id);
  });
  searchHistory.push(city);
  renderButtons();
});

function renderButtons() {
   $(".list-group").empty();
   for (var i = 0; i < searchHistory.length; i++) {
     var a = $("<button>");
     a.addClass("city");
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
   }).then(function(response) {
     console.log(response);
     var celsiusTemp = "Temp: "+(response.main.temp - 273.15).toFixed(2)+"°C";
     var windSpeed = "Wind: "+response.wind.speed+" KPH";
     var humidity = "Humidity "+response.main.humidity+"%";
     today.html(response.name+" ("+date+") "+iconContainer+"</br>"+ celsiusTemp + "</br>"+ windSpeed + "</br>"+ humidity);
     displayForecast(response.id);
   });
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
    //clear previous data from the forecast container
    forecast.empty(); 
    //OpenWeatherMap API provides weather data in 3 hour increments, and 24/3 = 8;
    //therefore, I'm incrementing by 8 to skip to the next day's forecast:
    for (var i = 1; i < response.list.length; i+=8) {
      //use .add  method to add 1 day to the object so that the forecast begins with the following day
      var forecastDate = moment(response.list[i].dt_txt).add(1, 'days').format("MM/DD/YYYY");
      var forecastTemp = (response.list[i].main.temp - 273.15).toFixed(2) + "°C";
      var forecastHumidity = response.list[i].main.humidity + "%";
      var forecastCard = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
      var forecastCardBody = $("<div>").addClass("card-body p-2");
      //display icons next to each forecast
      var weatherIconUrl = "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
      var iconContainer = $("<div id='weather-icon'>").html("<img src='" + weatherIconUrl + "' alt='Weather Icon'>");
      forecastCardBody.html("<h5 class='card-title'>" + forecastDate + "</h5>" + "<p class='card-text'>" + "Temp: " + forecastTemp + "</p>" + "<p class='card-text'>" + "Humidity: " + forecastHumidity + "</p>");
      forecastCard.append(forecastCardBody);
      forecastCard.prepend(iconContainer);
      forecast.append(forecastCard);
    }
  });
}

