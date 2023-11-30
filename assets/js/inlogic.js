


// function fetchRandomCocktail() {
//   var randomCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
//   fetch(randomCocktailURL)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     var drinkName = data.drinks[0].strDrink;
//     console.log(data);

//     var randomCocktailSection = $("#surprise");
//     randomCocktailSection.empty();
//     //code worked through with tutor
//     //   // make Bootstrap card
//     var card = $("<div>").addClass("card");
//     //   // make card body
//     var cardBody = $("<div>").addClass("card-body");
//     //   // card title with the city name
//     var cardTitle = $("<h1>").addClass("card-title").text("Name" + drinkName);



//     // Creates paragraphs for the weather info
    
//     //   var humidityParagraph = $("<p>").text("Humidity: " + humidity + "%");
//     //   var windSpeedParagraph = $("<p>").text("Wind Speed: " + windSpeed + " m/s");
//     //   var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
//     //   var iconImage = $("<img>").attr("src", iconUrl).attr("alt", "Weather Icon");


//     //   // Appends elements to the card body
//     cardBody.append(cardTitle, cocktailCardName);

//     //   // Append card body to the card
//       card.append(cardBody);

//     //   // Appends the card to the "today" html
//     //   sectionToday.append(card);


//   })
//   //catch we talked about in class. Need to research this more.
//   .catch(function (error) {
//     console.log("Error fetching cocktail data: " + error);

//   });
// }


// $("#surprise").on("click", function () {
//   fetchRandomCocktail();
// });
$(document).ready(function () {
  console.log('Document ready!');
  $("#surprise").on("click", function () {
    alert("Button clicked!");
    fetchRandomCocktail();
    console.log("button clicked");
  });

  function fetchRandomCocktail() {
    var randomCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  
    fetch(randomCocktailURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var drinkName = data.drinks[0].strDrink;
        var drinkImage = data.drinks[0].strDrinkThumb;
        console.log("Drink Image URL: " + drinkImage);

        console.log(data);

        var randomCocktailSection = $("#surpriseCardSection");
        randomCocktailSection.empty();
        
        // Make Bootstrap card
        var card = $("<div>").addClass("card");
        // Make card body
        var cardBody = $("<div>").addClass("card-body");
        // Card title with the drink name
        var cardTitle = $("<h1>").addClass("card-title").text("Name: " + drinkName);

        // Creates paragraphs for the cocktail info
        var cocktailCardName = $("<p>").text("Name: " + drinkName);
        // var imageUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
//     //   var iconImage = $("<img>").attr("src", iconUrl).attr("alt", "Weather Icon");

        var drinkImageSection = $("<img>").attr("src", drinkImage).addClass("card-img-top").attr("alt", "Cocktail Image");

        // Appends elements to the card body
        cardBody.append(cardTitle, cocktailCardName, drinkImageSection);

        // Append card body to the card
        card.append(cardBody);

        // Appends the card to the "surprise" html
        randomCocktailSection.append(card);

        console.log(data);
      })
      .catch(function (error) {
        console.log("Error fetching cocktail data: " + error);
      });
  }
});



// $("#surprise").on("click", function () {
//   fetchRandomCocktail();