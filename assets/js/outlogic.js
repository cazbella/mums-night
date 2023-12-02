

//Button logic and lat/long fetch
document.addEventListener("DOMContentLoaded", function () {
  // Event listener for the button click
  $("#searchButton").on("click", function () {
    // Get the user input
    var userInput = $("#inputPostcode").val();

    // Fetch latitude and longitude from OpenWeatherMap Geocoding API
    fetchLocation(userInput);
  });

  // Function to fetch latitude and longitude from OpenWeatherMap Geocoding API
  function fetchLocation(userInput) {
    var apiKeyOW = "66e478d3790b2fa410a64b9ae201d036";
    var geocodingURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&limit=1&appid=" + apiKeyOW;

    fetch(geocodingURL)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(function (data) {
        if (data.length > 0) {
          var lat = data[0].lat;
          var lon = data[0].lon;

          console.log("Latitude:", lat);
          console.log("Longitude:", lon);
        } else {
          console.error("No results found for the given input.");
        }
      })
      .catch(function (error) {
        console.error("Error fetching location:", error);
      });
  }

  function fetchCocktailBars(lat, lon) {
    // Construct the TomTom Search API URL for cocktail bars
    var cocktailBarsURL =
      "https://api.tomtom.com/search/2/search/cocktailBar.json?key=" +
      tomtomApiKey +
      "&lat=" +
      lat +
      "&lon=" +
      lon;

    // Fetch cocktail bars from TomTom API
    fetch(cocktailBarsURL)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(function (data) {
        // Process the data and display nearby cocktail bars on the map
        console.log("Cocktail Bars:", data);
        // Implement your logic to display nearby cocktail bars on the map
        // You can add markers or popups for each cocktail bar
        displayCocktailBarsOnMap(data.results);
      })
      .catch(function (error) {
        console.error("Cocktail Bars error:", error);
      });
  }

  function displayCocktailBarsOnMap(cocktailBars) {
    // Assuming `map` is your TomTom map object
    cocktailBars.forEach(function (bar) {
      // Create a marker for each cocktail bar
      var marker = new tt.Marker().setLngLat([bar.position.lon, bar.position.lat]).addTo(map);

      // You can customize the marker or add a popup with more information
      // marker.setPopup(new tt.Popup().setHTML(bar.address.freeformAddress));
    });
  }
});



// cocktail bar api 


// var apiKey = "1PlLlgkSL1yOVvPAAxneNWtg75jI8Xhx"
// // const apiURL = "https://api.tomtom.com/search/2/categorySearch/cocktail.json?key=" +apiKey
// const apiURL = "https://api.tomtom.com/search/2/nearbySearch/.json?key=1PlLlgkSL1yOVvPAAxneNWtg75jI8Xhx"
// // https://api.tomtom.com/search/2/categorySearch/cocktailBar.json?key=1PlLlgkSL1yOVvPAAxneNWtg75jI8Xhx&countrySet=uk"
// fetch(apiURL)
// .then(function (response) {
//   return response.json();
// }).then(function (data) {
//   console.log(data)
// });







// Postcode Geocoding

// https://developer.tomtom.com/geocoding-api/documentation/structgeo

var apiKeyMap = "1PlLlgkSL1yOVvPAAxneNWtg75jI8Xhx"
var inputPostcode = "wc2b 4bs"
var apiPostcodeURL = "https://api.tomtom.com/search/2/structuredGeocode.json?key=" + apiKeyMap + "&countryCode=GB&postalCode=" + inputPostcode

fetch(apiPostcodeURL)
.then(function (response) {
  return response.json();
}).then(function (data) {
  console.log(data)
  var lat = data.results[0].position.lat
  var lon = data.results[0].position.lon
  console.log(lat)
  console.log(lon)
  

  let currentLonLat = [lon, lat]
//   var map = tt.map({
//   key: "1PlLlgkSL1yOVvPAAxneNWtg75jI8Xhx",
//   container: "map",
//   center: currentLonLat,
//   zoom: 15
//   })
// map.on('load', () => {
// new tt.Popup({

});
    
// }).setLngLat(currentLonLat).setText("You are Here!").addTo(map);

