// Function to handle the search button click event
function handleSearch(event) {
    event.preventDefault(); // Prevent the default form submission behavior

          // Hide the form
          var form = document.getElementById('main');
          form.classList.add('hidden');

    // Get the input value
    var searchInput = document.getElementById('searchInput').value;

    // Make the API call
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            // Clear previous search results
            container.innerHTML = '';

            // Check if any drinks were found
            if (data.drinks && data.drinks.length > 0) {
                // Get the first drink from the result
                var drink = data.drinks[0];

                // Create a card element
                var card = document.createElement('div');
                card.classList.add('card');
                card.classList.add('has-background-grey-light')

                // Create a card content element
                var cardContent = document.createElement('div');
                cardContent.classList.add('card-content');

                // Create a card title element
                var cardTitle = document.createElement('p');
                cardTitle.classList.add('title');
                cardTitle.textContent = drink.strDrink;

                // Create a list element for the ingredients
                var ingredientsList = document.createElement('ol');
                ingredientsList.classList.add('ingredients-list');

                // Get the ingredients from the drink
                for (var i = 1; i <= 15; i++) {
                    var ingredient = drink[`strIngredient${i}`];
                    var measure = drink[`strMeasure${i}`];

                    // Check if ingredient and measure exist
                    if (ingredient && measure) {
                        var listItem = document.createElement('li');
                        listItem.textContent = `${measure} ${ingredient}`;
                        ingredientsList.appendChild(listItem);
                    }
                }

                // Create a card description element
                var cardDescription = document.createElement('p');
                cardDescription.classList.add('subtitle');
                cardDescription.textContent = drink.strInstructions;

                // Append the card title, ingredients list, and description to the card content
                cardContent.appendChild(cardTitle);
                cardContent.appendChild(ingredientsList);
                cardContent.appendChild(cardDescription);

                // Append the card content to the card
                card.appendChild(cardContent);

                // Append the card to the container
                container.appendChild(card);
            } else {
                // No drinks found
                var noResults = document.createElement('p');
                noResults.textContent = 'No drinks found.';
                container.appendChild(noResults);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Add event listener to the search button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', handleSearch);

