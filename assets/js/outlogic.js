
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

var apiKey = "1PlLlgkSL1yOVvPAAxneNWtg75jI8Xhx"
var inputPostcode = "wc2b 4bs"
var apiPostcodeURL = "https://api.tomtom.com/search/2/structuredGeocode.json?key=" + apiKey + "&countryCode=GB&postalCode=" + inputPostcode

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
  var map = tt.map({
  key: "1PlLlgkSL1yOVvPAAxneNWtg75jI8Xhx",
  container: "map",
  center: currentLonLat,
  zoom: 15
  })
map.on('load', () => {
new tt.Popup({
    
}).setLngLat(currentLonLat).setText("You are Here!").addTo(map)

})



});


// cocktail bar using lat and lon


// https://api.tomtom.com/search/2/categorySearch/cocktailBar.json?key=1PlLlgkSL1yOVvPAAxneNWtg75jI8Xhx&lat=51.5146&lon=-0.12031

// https://api.tomtom.com/search/2/search/cocktailBar.json?key=1PlLlgkSL1yOVvPAAxneNWtg75jI8Xhx&lat=51.5146&lon=-0.12031









// //    var yelpAPIKey = 
//    var yelpAPIKey = 
// //    var yelpURL = "https://yelp-reviews.p.rapidapi.com/?rapidapi-key=" + yelpAPIKey;
// // var yelpURL ="https://api.yelp.com/v3/businesses/search?location=london&term=cocktail%20bar&sort_by=best_match&limit=20/?api-key=" + yelpAPIKey;
   

// //   

// // Client ID
// // XRL0c5NUdo3E5VMmwUzbxQ

// // API Key
// // 

// const yelpURL = `https://api.yelp.com/v3/businesses/search?location=london&term=cocktail%20bar&sort_by=best_match&limit=20`;

// const options = {
//   method: 'GET',
//   headers: {
//     'Authorization': `Bearer ${yelpAPIKey}`,
//     'Accept': 'application/json',
//   }
// };

// fetch(yelpURL, options)
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));

//CODE FOR LATTITUDE AND LONGITUDE
async function fetchData() {
    const url = 'https://apidojo-booking-v1.p.rapidapi.com/properties/list-by-map?arrival_date=2024-08-14&departure_date=2024-08-15&room_qty=1&guest_qty=1&bbox=14.291283%2C14.948423%2C120.755688%2C121.136864&search_id=none&price_filter_currencycode=gbp&categories_filter=class%3A%3A1%2Cclass%3A%3A2%2Cclass%3A%3A3&languagecode=en-us&travel_purpose=leisure&order_by=popularity';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '9728b1a87emsh3dd1ad081550e2bp18045bjsn19c2833f0941',
        'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
      }
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function getRandomPlace() {
    // Fetch a list of all countries from REST Countries API
    const countriesResponse = await fetch('https://restcountries.com/v3.1/all');
    const countriesData = await countriesResponse.json();
  
    // Pick a random country from the list
    const randomCountry = countriesData[Math.floor(Math.random() * countriesData.length)];
  
    if (randomCountry && randomCountry.latlng) {
      const latitude = randomCountry.latlng[0];
      const longitude = randomCountry.latlng[1];
  
      console.log('Random Place:', randomCountry.name.common, ', Latitude:', latitude, ', Longitude:', longitude);
    } else {
      console.log('Unable to fetch random place information.');
    }
  }
  
  // Call the async function
  fetchData();

  const apiKey = 'YOUR_RAPIDAPI_KEY';  // Replace with your RapidAPI key
  const baseCurrency = 'GBP';
  const languageCode = 'en-uk';

  const url = `https://apidojo-booking-v1.p.rapidapi.com/currency/get-exchange-rates?base_currency=${baseCurrency}&languagecode=${languageCode}&rapidapi-key=${apiKey}`;

  https://apidojo-booking-v1.p.rapidapi.com/currency/get-exchange-rates?base_currency=USD&languagecode=en-us&rapidapi-key='9728b1a87emsh3dd1ad081550e2bp18045bjsn19c2833f0941'

  // Call the async function
  fetchData();

