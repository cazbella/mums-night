$(document).ready(function () {
  console.log('Document ready!');

  loadSavedCocktails();


  //event listener
  $("#surprise").on("click", function () {
    fetchRandomCocktail(function (data) {
      displayCocktail(data);
    });
    console.log("button clicked");
  });

  //event listener save
  $("#save-me").on("click", function () {
    getCocktailDataAndSave();
  });

  function fetchRandomCocktail(callback) {
    var randomCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    fetch(randomCocktailURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        callback(data);
      })
      .catch(function (error) {
        console.log("Error fetching cocktail data: " + error);
      });
  }

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
    savedCocktails.forEach(function (cocktail) {
      createButtonInFooter(cocktail.name);
    });
  }
  function createButtonInFooter(cocktailName) {
    var buttonId = "saved-" + cocktailName.replace(/\s+/g, '-').toLowerCase(); //
    var button = $("<button>")
      .addClass("btn btn-secondary btn-sm")
      .text(cocktailName)
      .attr("id", "saved");

    button.on("click", function () {
      loadSavedCocktail(cocktailName);
      console.log("Dynamically created button clicked for cocktail: " + cocktailName);
    });

    $(".card-body").find(".btn-primary").after(button);
  }

  function loadSavedCocktail(cocktailName) {
    var savedCocktails = JSON.parse(localStorage.getItem("savedCocktails")) || [];
    var savedCocktail = savedCocktails.find(function (cocktail) {
      return cocktail.name === cocktailName;
    });

    if (savedCocktail) {
      // Fetch the cocktail data related to the saved cocktail name
      fetchCocktailDataByName(cocktailName);
    } else {
      console.log("Saved cocktail not found: " + cocktailName);
    }
  }

  function fetchCocktailDataByName(cocktailName) {
    // Fetch the cocktail data based on the name
    var cocktailDataURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + encodeURIComponent(cocktailName);

    fetch(cocktailDataURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        displayCocktail(data);
      })
      .catch(function (error) {
        console.log("Error fetching cocktail data: " + error);
      });
  }



  // $("#saved").on("click", function () {
  //   fetchRandomCocktail(function(data) {
  //     displayCocktail(data);
  //   });
  //   console.log("button clicked");
  // });

  //CLEAR FAVOURITES
  // Event listener for the clear history button
  $("#clear-history-button").on("click", function () {
    // Clear the search history in localStorage
    localStorage.removeItem("searchHistory");

    console.log("Attempting to remove history buttons");

    // Removes the search history buttons
    $("#history").find(".history-button").remove();
  }
  )
}
);
