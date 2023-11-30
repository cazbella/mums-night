var randomCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php" 


fetch(randomCocktailURL)
   .then(function (response) {
      return response.json();
   }).then(function (data) { 
        console.log(data)
      var randomCocktailSection = $("#surprise");

      randomCocktailSection.empty();
      //code worked through with tutor
    //   // make Bootstrap card
    //   var card = $("<div>").addClass("card");
    //   // make card body
    //   var cardBody = $("<div>").addClass("card-body");
    //   // card title with the city name
    //   var cardTitle = $("<h1>").addClass("card-title").text + " " + rightNow);

      // variables for info
      var drinkName = data.drinks[0].strDrink;
    //   var humidity = data.main.humidity;
    //   var windSpeed = data.wind.speed;
    //   var iconCode = data.weather[0].icon;

      console.log("drink name" + drinkName);

      // Creates paragraphs for the weather info
    //   var temperatureParagraph = $("<p>").text("Temperature: " + temperature + " °C");
    //   var humidityParagraph = $("<p>").text("Humidity: " + humidity + "%");
    //   var windSpeedParagraph = $("<p>").text("Wind Speed: " + windSpeed + " m/s");
    //   var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
    //   var iconImage = $("<img>").attr("src", iconUrl).attr("alt", "Weather Icon");


    //   // Appends elements to the card body
    //   cardBody.append(cardTitle, iconImage, temperatureParagraph, humidityParagraph, windSpeedParagraph);

    //   // Append card body to the card
    //   card.append(cardBody);

    //   // Appends the card to the "today" html
    //   sectionToday.append(card);


    //   console.log(data);

   })
   //catch we talked about in class. Need to research this more.
   .catch(function (error) {
      console.log("Error fetching cocktail data: " + error);
   });
//    var yelpAPIKey = "0b9e17ec0fmsh2482d837c6d6e4fp1eef87jsncf1791176a4c";
   var yelpAPIKey = "Oi5U_fU6etXyRjHdZn4CnhJj5FXEWT7N166kXwETh79dVO2qW2vdAfF7xfIphPfTg6W9_ObDgGO7XBZAO2ywsuJhwl3fy9vEGIbhOIhT7lI0ztDFGaONMfVd3KhnZXYx"
//    var yelpURL = "https://yelp-reviews.p.rapidapi.com/?rapidapi-key=" + yelpAPIKey;
var yelpURL ="https://api.yelp.com/v3/businesses/search?location=london&term=cocktail%20bar&sort_by=best_match&limit=20/?api-key=" + yelpAPIKey;
   

//    https://api.yelp.com/?api-key=Oi5U_fU6etXyRjHdZn4CnhJj5FXEWT7N166kXwETh79dVO2qW2vdAfF7xfIphPfTg6W9_ObDgGO7XBZAO2ywsuJhwl3fy9vEGIbhOIhT7lI0ztDFGaONMfVd3KhnZXYx/v3/businesses/search?location=london&term=cocktail%20bar&sort_by=best_match&limit=20/

// Client ID
// XRL0c5NUdo3E5VMmwUzbxQ

// API Key
// Mj20sSsnMQkCnYgdizmHXigFlzjzts2XjcvASzfVddYAsy6rIkOuvdcAG0Kul09aA9kwv5AxStYNN3HjH5CUiiKvJEaw8PumHIOQiAU0Tx8-4OMgz2EPYcyA169nZXYx

const options = {
  method: 'GET',
  mode: "no-cors",
  headers: {
    accept: 'application/json',
    Authorization: 
  }
};
fetch('https://api.yelp.com/v3/businesses/search?location=london&term=bar&sort_by=best_match&limit=20', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));