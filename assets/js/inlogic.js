




// https://{baseURL}/search/{versionNumber}/structuredGeocode.{ext}?key={Your_API_Key}&countryCode={countryCode}&limit={limit}&ofss={ofss}&streetNumber={streetNumber}&streetName={streetName}&crossStreet={crossStreet}&municipality={municipality}&municipalitySubdivision={municipalitySubdivision}&countryTertiarySubdivision={countryTertiarySubdivision}
// &countrySecondarySubdivision={countrySecondarySubdivision}&countrySubdivision={countrySubdivision}&postalCode={postalCode}&language={language}&extendedPostalCodesFor={extendedPostalCodesFor}&view={view}&mapcodes={mapcodes}&entityTypeSet={entityTypeSet}


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
<<<<<<< Updated upstream
=======
  loadSavedCocktails();

  //event listener
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

  function displayCocktail(data) {
    var drinkName = data.drinks[0].strDrink;
    var drinkImage = data.drinks[0].strDrinkThumb;
    var drinkIngredients = getIngredients(data.drinks[0]);
    var drinkInstructions = data.drinks[0].strInstructions;
    console.log("Drink Image URL: " + drinkImage);

    var randomCocktailSection = $("#surpriseCardSection");
    randomCocktailSection.empty();

    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    var cardTitle = $("<h1>").addClass("card-title").text("Name: " + drinkName);
    var cocktailCardIngredients = $("<p>").html("Ingredients: " + drinkIngredients);
    var cocktailCardInstructions = $("<p>").text("Instructions: " + drinkInstructions);
    var drinkImageSection = $("<img>").attr("src", drinkImage).addClass("card-img-top").attr("alt", "Cocktail Image");

    cardBody.append(cardTitle, cocktailCardIngredients, drinkImageSection, cocktailCardInstructions);
    card.append(cardBody);
    randomCocktailSection.append(card);

    // Store the data in the image element's data attribute
    randomCocktailSection.find("img").data("cocktailData", data);
  }

  function getCocktailDataAndSave() {
    var data = $("#surpriseCardSection").find("img").data("cocktailData");

    if (data && data.drinks && data.drinks.length > 0) {
      var drinkData = data.drinks[0];
      var cocktailData = {
        name: drinkData.strDrink || "",
        image: drinkData.strDrinkThumb || "",
        ingredients: getIngredients(drinkData) || "",
        instructions: drinkData.strInstructions || "",
      };

      saveCocktailToLocal(cocktailData);
      console.log("Save Me button clicked");
    } else {
      console.log("No cocktail data available.");
    }
  }

  function getIngredients(data) {
    var ingredients = [];
    for (var i = 1; i <= 15; i++) {
      var ingredient = data["strIngredient" + i];
      var measure = data["strMeasure" + i];
      if (ingredient && measure) {
        ingredients.push(measure + " " + ingredient);
      }
    }
    return ingredients.join("<br>");
  }

  function saveCocktailToLocal(cocktailData) {
    if (cocktailData) {
      var savedCocktails = JSON.parse(localStorage.getItem("savedCocktails")) || [];
      savedCocktails.push(cocktailData);
      localStorage.setItem("savedCocktails", JSON.stringify(savedCocktails));
      createButtonInFooter(cocktailData.name);
    }
  }

  function loadSavedCocktails() {
    var savedCocktails = JSON.parse(localStorage.getItem("savedCocktails")) || [];
    savedCocktails.forEach(function(cocktail) {
      createButtonInFooter(cocktail.name);
    });
  }

  function createButtonInFooter(cocktailName) {
    var button = $("<button>").addClass("btn btn-secondary btn-sm").text(cocktailName);

    button.on("click", function () {
      console.log("Dynamically created button clicked for cocktail: " + cocktailName);
    });

    $(".card-body").find(".btn-primary").after(button);
  }
>>>>>>> Stashed changes
});



// $("#surprise").on("click", function () {
//   fetchRandomCocktail();

