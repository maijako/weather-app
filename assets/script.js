//The API Key
var APIKey = "54374761b115880386522bedb63f1a22";
// The query URL
var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=" + APIKey;
// set variables
var cities = [];

// an AJAX call
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  
console.log(response);
});

//Function for displaying city data in search history as buttons
function renderButtons() {
   // Deletes the city data prior to adding new cities from search
   $(".list-group").empty();

   // Loops through the array of cities from the search history
   for (var i = 0; i < cities.length; i++) {

     // Then dynamicaly generates buttons for each city in the array
     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
     var a = $("<button>");
     // Adds a class of movie to our button
     a.addClass("city");
     // Added a data-attribute
     a.attr("data-name", cities[i]);
     // Provided the initial button text
     a.text(cities[i]);
     // Added the button to the buttons-view div
     $(".list-group").append(a);
   }
 }

 // This function handles events where the add a city to history when search button is clicked
 $("#search-button").on("click", function(event){
   event.preventDefault();
   // This line of code will grab the input from the textbox
   var city = $("#search-input").val().trim();

   // The city from the textbox is then added to our array
   cities.push(city);

   // Calling renderButtons which handles the processing of our movie array
   renderButtons();

 });

 // Adding click event listeners to all elements with a class of "movie"
 $(document).on("click", ".movie", displayMovieInfo);

 // Calling the renderButtons function to display the initial buttons
 renderButtons();