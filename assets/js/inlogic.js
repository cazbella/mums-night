// Countdown to the weekend 

const currentDay = dayjs().day();
// const currentDay = 5;

const daysUntilWeekend = (5 - currentDay + 7) % 7;

const weekendDate = dayjs().add(daysUntilWeekend, 'day').endOf('day');


  function updateCountdown() {
    const timeRemaining = weekendDate.diff(dayjs());

   
    if (currentDay === 5 || currentDay === 6) {
      const countdownElement = document.getElementById('countdown');
   
      countdownElement.innerHTML = `<div class="weekendMsg">It's the weekend! You Deserve a Cocktail! Hit the Search to find a Cocktail!</div>`; // Display a message
    } else {
      const days = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
      const hours = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);

      const countdownElement = document.getElementById('countdown');
      countdownElement.style.display = 'flex';
      countdownElement.innerHTML =
       `
       <div class="days">
      
        <p class="daysNumber">${days}</p>
        <p class="number"> Days</p>
        </div>

        <div class="hours">
        <p class="hoursNumber">${hours}</p>
        <p> Hours </p>
        </div>

        <div class="minutes">
        <p class="minutesNumber">${minutes}</p>
        <p> Minutes </p>
        </div>

        
        <div class="seconds">
        <p class="secondsNumber">${seconds}</p>
        <p> seconds </p>
        </div>

      `;
    }
  }

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Initial update
updateCountdown();




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


// //event listener save
// $("#save-me").on("click", function () {
//   getCocktailDataAndSave();
// });

//https://youtu.be/kz_vwAF4NHI?si=-c8Typf3oGpAE08v
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
  console.log(data);
  // Check if 'drinks' property exists and it's an array with at least one element
  if (data.drinks && Array.isArray(data.drinks) && data.drinks.length > 0) {
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

    var saveButton = $("<button>")
      .addClass("btn btn-primary save")
      .attr("id", "save-me")
      .text("Save Me")
      .on("click", function () {
        // Save the cocktail to favorites when the button is clicked
        saveCocktailToLocal({
          name: drinkName,
          image: drinkImage,
          ingredients: drinkIngredients,
          instructions: drinkInstructions,
        });
      });
      

    cardBody.append(cardTitle, cocktailCardIngredients, drinkImageSection, cocktailCardInstructions, saveButton);
    card.append(cardBody);
    randomCocktailSection.append(card);

    // stores the data in the image element's data attribute
    randomCocktailSection.find("img").data("cocktailData", data);
  } else {
    console.log("Invalid or empty data received from the API.");
  }
}

function getCocktailDataAndSave() {
  var data = $("#surpriseCardSection").find("img").data("cocktailData");
  //checks array exists
  if (data && data.drinks && data.drinks.length > 0) {
    var drinkData = data.drinks[0];
    var cocktailData = {
      name: drinkData.strDrink || "",
      image: drinkData.strDrinkThumb || "",
      ingredients: getIngredients(drinkData) || "",
      instructions: drinkData.strInstructions || "",
    };
    //calls function to save to local 
    saveCocktailToLocal(cocktailData);
    console.log("Save Me button clicked");
  } else {
    console.log("No cocktail data available.");
  }
}

function getIngredients(data) {
  //initialise empty array
  var ingredients = [];
  //there are 15 spaces for ingredients in the returned data from the api
  for (var i = 1; i <= 15; i++) {
    //gets values of properties
    var ingredient = data["strIngredient" + i];
    var measure = data["strMeasure" + i];
    //chechs if ingredient and measure are truthy
    if (ingredient && measure) {
      //if both are present, constructs a string in the format in brackets
      ingredients.push(measure + " " + ingredient);
    }
  }
  //line below tells the function to return the incredients built in the array. .join concatenates all elements into a single string. takes a seperator as an argument <br> to add spaces
  return ingredients.join("<br>");
}
//same as last challenge
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
  //iterate over saved cocktail
  savedCocktails.forEach(function (cocktail) {
    //calls functiom below
    createButtonInFooter(cocktail.name);
  });
}
//dynamically creates saved buttons. 
function createButtonInFooter(cocktailName) {
  var button = $("<button>")
    .addClass("btn btn-secondary btn-sm saved-cocktail-button")
    .text(cocktailName)
    .attr("id", "search-save");

  button.on("click", function () {
    loadSavedCocktail(cocktailName);
    console.log("Dynamically created button clicked for cocktail: " + cocktailName);
  });

  $("#faves").prepend(button);
}
//CLEAR FAVOURITES
$("#delete-favourites").on("click", function () {
  // Clear search history in localStorage
  localStorage.removeItem("savedCocktails");

  console.log("Attempting to remove history buttons");

  // Removes the search history buttons
  $("#faves").find(".saved-cocktail-button").remove();
});

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

// function fetchCocktailDataByName(cocktailName) {
//   // Fetch the cocktail data based on the name
//   var cocktailDataURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + encodeURIComponent(cocktailName);

//   //encodeURIComponent makes sure that the cocktail name is properly encoded for inclusion in a URL. Alphanumeric remains the same, 'reserved charachters' are encoded with %symbol, as are und=safe characters. Whitespace is with %20 as seen in lessons. 

//   fetch(cocktailDataURL)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       displayCocktail(data);
//     })
//     .catch(function (error) {
//       console.log("Error fetching cocktail data: " + error);
//     });
function fetchCocktailDataByName(cocktailName) {
  // Fetch the cocktail data based on the name
  var cocktailDataURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + encodeURIComponent(cocktailName);

  fetch(cocktailDataURL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      console.log("API Response:", data); // this line logs the API response
      displayCocktail(data);
    })
    .catch(function (error) {
      console.error("Error fetching cocktail data:", error);
    });
}


// Event listener for the search button
document.getElementById("search").addEventListener("click", function () {
  // Get values from form inputs
  var cocktailName = document.getElementById("cocktailName").value;
  var ingredient = document.getElementById("ingredient").value;

  // Perform search based on form inputs
  searchCocktails(cocktailName, ingredient);
});



// Function to perform cocktail search
function searchCocktails(cocktailName, ingredient) {
  var searchURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?";
  var queryParams = [];
  //CODE FROM WEB
  //https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  //The URLSearchParams interface defines utility methods to work with the query string of a URL.

  //An object implementing URLSearchParams can directly be used in a for...of structure to iterate over key/value pairs in the same order as they appear in the query string, for example the following two lines are equivalent:
  // Add parameters based on user input
  if (cocktailName) queryParams.push("s=" + encodeURIComponent(cocktailName));
  if (ingredient) queryParams.push("i=" + encodeURIComponent(ingredient));
  // if (isAlcoholic) queryParams.push("a=Alcoholic");
  // if (isNonAlcoholic) queryParams.push("a=Non_Alcoholic");

  // constructs the final search URL
  searchURL += queryParams.join("&");
  console.log(searchURL);

  fetch(searchURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // displays results
      displayCocktail(data);
    })
    .catch(function (error) {
      console.log("Error fetching cocktail data: " + error);
    });
}

// Event listener for the search by ingredient button
document.getElementById("search-by-ingredient").addEventListener("click", function () {
  // Get the ingredient from the input
  var ingredient = document.getElementById("ingredient").value;

  // Perform search by ingredient
  searchCocktailsByIngredient(ingredient);
});

// Function to search cocktails by ingredient
function searchCocktailsByIngredient(ingredient) {
  // Clear existing content in the surpriseCardSection
  document.getElementById("surpriseCardSection").innerHTML = "";

  // API URL for searching cocktails by ingredient
  var searchByIngredientURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + encodeURIComponent(ingredient);

  fetch(searchByIngredientURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayCocktailList(data.drinks);
    })
    .catch(function (error) {
      console.log("Error fetching cocktails by ingredient: " + error);
    });
}

// Function to display a list of cocktails
function displayCocktailList(cocktails) {
  $("#surpriseCardSection").empty();
  //  if there are cocktails response
  if (cocktails && Array.isArray(cocktails) && cocktails.length > 0) {
    // make unordered list to append cocktails
    var ul = document.createElement("ul");
    ul.className = "list-group";

    // iterate over the cocktails and create list items
    cocktails.slice(0, 10).forEach(function (cocktail) {
      var listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.textContent = cocktail.strDrink;
      listItem.style.cursor = "pointer";
      listItem.addEventListener("click", function () {
        // Handle click event to fetch and display details of the selected cocktail
        fetchCocktailDetails(cocktail.idDrink);
      });

      ul.appendChild(listItem);
    });

    // appends the list to the surpriseCardSection
    document.getElementById("surpriseCardSection").appendChild(ul);
  } else {
    //message if no cocktails are found
    document.getElementById("surpriseCardSection").textContent = "No cocktails found with the specified ingredient.";
  }
}

// fetch details of a specific cocktail by its ID
function fetchCocktailDetails(cocktailId) {
  var cocktailDetailsURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + cocktailId;

  fetch(cocktailDetailsURL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      console.log("API Response:", data); // Log the entire API response

      // Extract the first drink details from the response
      var cocktailDetails = data.drinks && Array.isArray(data.drinks) && data.drinks.length > 0
        ? data.drinks[0]
        : null;

      if (cocktailDetails) {
        console.log("Cocktail Details:", cocktailDetails);
        displayCocktailDetails(cocktailDetails);
      } else {
        console.error("Invalid or empty data received from the API.");
      }
    })
    .catch(function (error) {
      console.error("Error fetching cocktail details:", error);
    });
}



function displayCocktailDetails(cocktail) {
  if (cocktail) {
    // make card elements for the clicked cocktail
    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    var cardTitle = $("<h1>").addClass("card-title").text("Name: " + cocktail.strDrink);
    var cocktailCardIngredients = $("<p>").html("Ingredients: " + getIngredients(cocktail));
    var cocktailCardInstructions = $("<p>").text("Instructions: " + cocktail.strInstructions);
    var drinkImageSection = $("<img>").attr("src", cocktail.strDrinkThumb).addClass("card-img-top").attr("alt", "Cocktail Image");

    // Create a "Save to Favorites" button
    var saveButton = $("<button>")
      .addClass("btn btn-secondary btn-sm saved-cocktail-search-name-button")
      .text("Save to Favorites")
      .on("click", function () {
        // Save the cocktail to favorites when the button is clicked
        saveCocktailToLocal({
          name: cocktail.strDrink,
          image: cocktail.strDrinkThumb,
          ingredients: getIngredients(cocktail),
          instructions: cocktail.strInstructions,
        });
      });
        
        createButtonInFooter(cocktail.strDrink);
    

    cardBody.append(cardTitle, cocktailCardIngredients, drinkImageSection, cocktailCardInstructions, saveButton);
    card.append(cardBody);

    // clears existing content in the surpriseCardSection and appends the card
    $("#surpriseCardSection").empty().append(card);
  } else {
    console.log("No cocktail details available.");
  }
}


// listener for the search by ingredient button
$("#search-by-ingredient").on("click", function () {
  // Get ingredient from the input
  var ingredient = $("#ingredient").val();

  // Perform search by ingredient
  searchCocktailsByIngredient(ingredient);
});



//tries to do autocomplete - failed!! API not suitable???
// fetches the list of ingredients from CocktailsDB API
//this fills autocomplete
// function fetchIngredientSuggestions(request, response) {
// var ingredientURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";

// $.ajax({
//   url: ingredientURL,
//   dataType: "json",
//   success: function (data) {
//     // gets the ingredient names from the API response
//     var ingredients = data.drinks.map(function (drink) {
//       return drink.strIngredient1;
//     });

//     // filter suggestions based on the user's input
//     var filteredSuggestions = ingredients.filter(function (ingredient) {
//       return ingredient.toLowerCase().includes(request.term.toLowerCase());
//     });

//     response(filteredSuggestions);
//   },
//   error: function () {
//     console.log("Error fetching ingredient suggestions from CocktailsDB API.");
//   },
// });
// }

// $("#ingredient").autocomplete({
// source: fetchIngredientSuggestions,
// minLength: 1, //means needs 1 charachter
// });


// });


});