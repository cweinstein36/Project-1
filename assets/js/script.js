// Function to handle the search button click event
function handleSearch(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Hide the form
  var form = document.getElementById("main");
  form.classList.add("hidden");

  // Get the input value
  var searchInput = document.getElementById("searchInput").value;

  //run the saveSearch function
  saveDrink(searchInput);

  // Make thecocktailDB API call
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Clear previous search results
      container.innerHTML = "";

      // Check if any drinks were found
      if (data.drinks && data.drinks.length > 0) {
        // Get the first drink from the result
        var drink = data.drinks[0];

        // Create a card element
        var card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("has-background-grey-light");

        // Create a card content element
        var cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        // Create a card title element
        var cardTitle = document.createElement("p");
        cardTitle.classList.add("title");
        cardTitle.textContent = drink.strDrink;

        // Create a list element for the ingredients
        var ingredientsList = document.createElement("ol");
        ingredientsList.classList.add("ingredients-list");

        // Get the ingredients from the drink
        for (var i = 1; i <= 15; i++) {
          var ingredient = drink[`strIngredient${i}`];
          var measure = drink[`strMeasure${i}`];

          // Check if ingredient and measure exist
          if (ingredient && measure) {
            var listItem = document.createElement("li");
            listItem.textContent = `${measure} ${ingredient}`;
            ingredientsList.appendChild(listItem);
          }
        }

        // Create a card description element
        var cardDescription = document.createElement("p");
        cardDescription.classList.add("subtitle");
        cardDescription.textContent = drink.strInstructions;

        // Append the card title, ingredients list, and description to the card content
        cardContent.appendChild(cardTitle);
        cardContent.appendChild(ingredientsList);
        cardContent.appendChild(cardDescription);

        // Append the card content to the card
        card.appendChild(cardContent);

        // Append the card to the container
        container.appendChild(card);

        // Make the GoogleMaps API call
        var mapUrl = "https://maps.googleapis.com/maps/api/staticmap";
        var apiKey = "AIzaSyAM2OYawouGodt4vc94bh_0d5vDnwq8Mks";
        var location = "28.510379801567414, -81.37350289387919";
        var zoom = 15;
        var size = "600x400";

        var imageUrl = `${mapUrl}?center=${location}&zoom=${zoom}&size=${size}&key=${apiKey}`;
        var mapTitle = document.createElement("p");
        mapTitle.classList.add("title");
        mapTitle.textContent = "At Publix Grocery and Liquor Store in Orlando, FL \n you can find everything you need!";

        var mapImage = document.createElement("img");
        mapImage.src = imageUrl;

        var mapContainer = document.getElementById("mapContainer");
        mapContainer.appendChild(mapTitle);
        mapContainer.appendChild(mapImage);
        
      } else {
        // No drinks found
        var noResults = document.createElement("div");
        noResults.classList.add("notification");
        noResults.classList.add("is-warning");
        noResults.textContent = "No drinks found.";
        container.appendChild(noResults);
        container.classList.add("has-text-centered")
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//function is pushing information into an array, info is also saved regardless of refresh
function saveDrink(drinkSearched) {
  var search = JSON.parse(localStorage.getItem("recentDrinks")) || [];

  search.push(drinkSearched);
  //this will pull the most recent five items if the array goes above five items
  if (search.length > 5) {
    search = search.slice(-5);
  }

  localStorage.setItem("recentDrinks", JSON.stringify(search));
}

//adding the recent searches to page
function recentSearch(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  var form = document.getElementById("main");
  form.classList.add("hidden");
  var container = document.getElementById("container");
  container.classList.add("hidden");
  var mapContainer = document.getElementById("mapContainer");
  mapContainer.classList.add("hidden");
  // Reach the recentSearches div within the HTML
  var recentSearches = document.getElementById("recentSearchList");
  // Retrieve the recent drinks array from local storage
  var recentDrinks = JSON.parse(localStorage.getItem("recentDrinks")) || [];
  // Clear the recentSearches div before adding new elements
  recentSearches.innerHTML = "";
  // Create a card element for recent searches
  var card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("has-background-grey-light");
  // Create a card title for recent searches
  var cardTitle = document.createElement("p");
  cardTitle.classList.add("title");
  cardTitle.textContent = "Your Recent Searches";
  card.appendChild(cardTitle);

  recentDrinks.forEach(function (drinkSearched) {
    var drinkList = document.createElement("li");
    drinkList.textContent = drinkSearched;
    card.appendChild(drinkList);
  });

  recentSearches.appendChild(card);
}

// Add event listener to the search button
var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", handleSearch);

//Add event listener to recent searches button
var recentSearchButton = document.getElementById("recentSearchButton");
recentSearchButton.addEventListener("click", recentSearch);
