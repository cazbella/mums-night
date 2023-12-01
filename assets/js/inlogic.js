$(document).ready(function () {
  console.log('Document ready!');
  $("#surprise").on("click", function () {
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
        var drinkIngredients = 
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

