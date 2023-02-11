//Variables
var APIKey = "54374761b115880386522bedb63f1a22";
var searchHistory = [];
var city;

// This function handles events where the add a city to history when search button is clicked
$("#search-button").on("click", function(event) {
  event.preventDefault(); 
  city = $("#search-input").val().trim();
  if (!city) {
    return;
  }
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  // an AJAX call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //a console log for grabbing the data 
    console.log(response);
  });
  searchHistory.push(city);
  renderButtons();
});

//Function for displaying city data in search history as buttons
function renderButtons() {
   // Deletes the city data prior to adding new cities from search
   $(".list-group").empty();

   // Loops through the array of cities from the search history
   for (var i = 0; i < searchHistory.length; i++) {
     // Then dynamicaly generates buttons for each city in the array
     var a = $("<button>");
     // Adds a class of movie to our button
     a.addClass("city");
     // Added a data-attribute
     a.attr("data-name", searchHistory[i]);
     // Provided the initial button text
     a.text(searchHistory[i]);
     // Added the button to the buttons-view div
     $(".list-group").append(a);
   }
 }
 
 // Adding click event listeners to all elements with a class of "city"
 $(document).on("click", ".city", function() {
   // Add logic here to display information about the city
 });

 // Calling the renderButtons function to display the initial buttons
 renderButtons();
