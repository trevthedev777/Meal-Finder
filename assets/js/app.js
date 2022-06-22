// DOM elements
const search = document.getElementById("search"),
      submit = document.getElementById("submit"),
      random = document.getElementById("random"),
      mealsElement = document.getElementById("meals"),
      resultHeading = document.getElementById("result-heading"),
      single_mealElement = document.getElementById("single-meal")

// Search meal and fetch from API
function searchMeal(e) {
    e.preventDefault();

    // Clear Single Meal Search
    single_mealElement.innerHTML = "";

    // Get Search Term
    const term = search.value;

    // check for empty
    if (term.trim()) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            resultHeading.innerHTML = `<h2>Search results for "${term}":</h2>`

            if (data.meals === null) {
                resultHeading.innerHTML = 
                `<h3>
                    There are no search results for "${term}", try again
                </h3>`
            } else {
                mealsElement.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `)
                .join("");
            }

            console.log(mealsElement)
        })
        // Clear Search Text
        search.value = "";
    } else {
        alert("Please enter a search value");
    };
};


//   Event Listeners
submit.addEventListener("submit", searchMeal)