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
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var celsiusTemp = "Temp: "+(response.main.temp - 273.15).toFixed(2)+"°C";
    var windSpeed = "Wind: "+response.wind.speed+" KPH";
    var humidity = "Humidity "+response.main.humidity+"%";
    today.html(response.name+" ("+date+") "+"</br>"+ celsiusTemp + "</br>"+ windSpeed + "</br>"+ humidity);
    // displayForecast(response.id);
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
     today.html(response.name+" ("+date+") "+"</br>"+ celsiusTemp + "</br>"+ windSpeed + "</br>"+ humidity);
    //  displayForecast(response.id);
   });
 });
 
 renderButtons();

// Function to display the five-day weather forecast
// function displayForecast(cityID) {
//   var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID
