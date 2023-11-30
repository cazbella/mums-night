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











