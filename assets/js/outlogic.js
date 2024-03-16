// Button logic and lat/long fetch
document.addEventListener("DOMContentLoaded", function () {
  
    // Add event listener for Bootstrap tab shown event
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // Get the target tab
        var targetTab = $(e.target).attr("href");

        // Check if the target tab is the "Night In" tab
        if (targetTab === "#nightInTab") {
            // Clear the "Night Out" section
            clearNightOutSection();
        }
    });

    // Function to clear the "Night Out" section
    function clearNightOutSection() {
        $('#cocktail-bars-display').empty();
    }
    
  // Event listener for the button click
  $("#citySearchButton").on("click", function () {
    // Get the user input
    var userInput = $("#inputCity").val();

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
    const apiURL = `https://api.tomtom.com/search/2/search/cocktail.json?key=${apiKeyTomTom}&lat=${latitude}&lon=${longitude}`;

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



// Abigail Code

document.addEventListener("DOMContentLoaded", function() {
  $("#postcodeSearchButton").on("click", function () {
  
   var searchPostcode = $("#inputPostcode").val();
  
   fetchLocation(searchPostcode);
  
  
  });
  
  // function to fetch lon/lat api returns lon lat. store lon/lat for locations api search
  function fetchLocation(searchPostcode){
    var postcodeApiKey = "1PlLlgkSL1yOVvPAAxneNWtg75jI8Xhx"
    var postcodeApiURL = "https://api.tomtom.com/search/2/structuredGeocode.json?key=" + postcodeApiKey + "&countryCode=GB&postalCode=" + searchPostcode
  
  fetch(postcodeApiURL)
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return response.json()
  })
  .then(function(data) {
    var lat = data.results[0].position.lat
    var lon = data.results[0].position.lon
    console.log("Latitude: " + lat)
    console.log("Longitude: " + lon)
  
  
    fetchBar(lat,lon)
  });
  }
  // takes lon lat and uses function to fetch local bars in 10 mile radius
  
  function fetchBar(lat, lon) {
    var cocktailBarApi = "1PlLlgkSL1yOVvPAAxneNWtg75jI8Xhx"
    var cocktailBarURL = "https://api.tomtom.com/search/2/search/cocktail.json?key=" + cocktailBarApi + "&lat=" + lat + "&lon=" + lon
    fetch(cocktailBarURL)
    .then(function(response){
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
  
    })
    .then(function(data) {
      // var cocktailBarName = data.results[0].poi.name
      // var cocktailBarURL = data.results[0].poi.url
      // var cocktailBarAddress = data.results[0].address
      // var cocktailBarContact = data.results[0].poi.phone
      // var cocktailBarDistance = data.results[0].dist
      // console.log(cocktailBarName, cocktailBarURL, cocktailBarAddress, cocktailBarContact, cocktailBarDistance)
  displayCocktailBar(data)
  
    })
  }

  // store relevant data in variables -bar name -bar address -Image -Contact -distance from current location?

  function displayCocktailBar(response) {
    var cocktailbarContainer = $("#cocktail-bars-display")
    cocktailbarContainer.empty();
  
    const results = response.results
  
    for (var i=0; i < 10; i++) {

    var cocktailBarName = results[i].poi.name
    var cocktailBarURL = results[i].poi.url
    var cocktailBarAddress = results[i].address.freeformAddress
    var cocktailBarContact = results[i].poi.phone

  
  
  
  

    const card = `<div class="card mt-2">
    <div class="card-body">
      <h5 class="card-title">${cocktailBarName}</h5>
      <p class="card-text">Address: ${cocktailBarAddress}</p>
     
    </div>
  </div>`;

  cocktailbarContainer.append(card)
    }
  }
  });
  


