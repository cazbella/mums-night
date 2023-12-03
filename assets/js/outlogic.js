// Button logic and lat/long fetch
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

          // Call the function to fetch data from TomTom API with lat and lon
          fetchTomTomData(lat, lon);
        } else {
          console.error("No results found for the given input.");
        }
      })
      .catch(function (error) {
        console.error("Error fetching location:", error);
      });
  }

  // Function to fetch data from TomTom API
  function fetchTomTomData(latitude, longitude) {
    var apiKeyTomTom = "1PlLlgkSL1yOVvPAAxneNWtg75jI8Xhx";
    const apiURL = `https://api.tomtom.com/search/2/search/pub.json?key=${apiKeyTomTom}&lat=${latitude}&lon=${longitude}`;

    fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Call the function to update the content in the display section
      updateCocktailBars(data);
    })
    .catch(function (error) {
      console.error("Error fetching TomTom data:", error);
    });
  }
// Function to update the content in the display section
function updateCocktailBars(response) {
  const displaySection = $('#cocktail-bars-display');
  displaySection.empty(); // Clear previous content

  const results = response.results;

  // Display the nearest 10 cocktail bars
  for (let i = 0; i < 10 && i < results.length; i++) {
    const barName = results[i].poi.name;
    const address = results[i].address.freeformAddress;

    const card = `<div class="card mt-2">
                    <div class="card-body">
                      <h5 class="card-title">${barName}</h5>
                      <p class="card-text">${address}</p>
                    </div>
                  </div>`;

    displaySection.append(card);
  }
}

});



//   function fetchCocktailBars (latitude, longitude) {

  
//   var apiKeyYelp = "Mj20sSsnMQkCnYgdizmHXigFlzjzts2XjcvASzfVddYAsy6rIkOuvdcAG0Kul09aA9kwv5AxStYNN3HjH5CUiiKvJEaw8PumHIOQiAU0Tx8-4OMgz2EPYcyA169nZXYx";
//   const apiUrl = 'https://api.yelp.com/v3/businesses/search';
//   const categories = 'cocktailbars';

//   const url = `${apiUrl}?latitude=${latitude}&longitude=${longitude}&categories=${categories}`;

//   fetch(url, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${apiKeyYelp}`,
//     },
//   })
//     .then(response => response.json())
//     .then(data => {
//       // Process the Yelp data here
//       console.log(data);
//     })
//     .catch(error => console.error('Error:', error));
// }
// });
  
  // function fetchCocktailBars(lat, lon) {
  //   // Construct the TomTom Search API URL for cocktail bars
  //   var cocktailBarsURL =
  //     "https://api.tomtom.com/search/2/search/cocktailBar.json?key=" +
  //     tomtomApiKey +
  //     "&lat=" +
  //     lat +
  //     "&lon=" +
  //     lon;




// cocktail bar api 








// Postcode Geocoding

// https://developer.tomtom.com/geocoding-api/documentation/structgeo

// var apiKeyMap = "1PlLlgkSL1yOVvPAAxneNWtg75jI8Xhx"
// var inputPostcode = "wc2b 4bs"
// var apiPostcodeURL = "https://api.tomtom.com/search/2/structuredGeocode.json?key=" + apiKeyMap + "&countryCode=GB&postalCode=" + inputPostcode

// fetch(apiPostcodeURL)
// .then(function (response) {
//   return response.json();
// }).then(function (data) {
//   console.log(data)
//   var lat = data.results[0].position.lat
//   var lon = data.results[0].position.lon
//   console.log(lat)
//   console.log(lon)
  

//   let currentLonLat = [lon, lat]
//   var map = tt.map({
//   key: "1PlLlgkSL1yOVvPAAxneNWtg75jI8Xhx",
//   container: "map",
//   center: currentLonLat,
//   zoom: 15
//   })
// map.on('load', () => {
// new tt.Popup({

// });
    
// }).setLngLat(currentLonLat).setText("You are Here!").addTo(map);

