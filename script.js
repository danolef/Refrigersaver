// DOM Selectors
const baseUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
const inputIngredient = document.querySelector('#ingredient-search')
const recipeMenu = document.querySelector('#recipe-menu')
const searchIngredientForm = document.querySelector('#search-form')

// EventListeners
searchIngredientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let ingredient = document.querySelector('#ingredient-search').value;
    // console.log(ingredient)
    getRecipeData(ingredient);
    searchIngredientForm.reset();
})

// Fetch Functions
function getRecipeData(ingredient) {
    let newUrl = baseUrl + `${ingredient}`
    fetch(newUrl)
    .then(r => r.json())
    .then(mealsObjectWithArray => {
        let mealsArray = mealsObjectWithArray.meals;
        recipeMenu.innerHTML = '',
        // console.log(mealsArray)
        mealsArray.forEach(renderRecipes)
    })
}

// Render Functions
function renderRecipes(meal){
            
        let newMealObject = {
            id: meal.idMeal,
            image: meal.strMealThumb,
            title: meal.strMeal,
        }

        let mealImage = newMealObject.image;
        let mealTitle = newMealObject.title;
        let mealImageDom = document.createElement('img');
        mealImageDom.src = mealImage;
        mealImageDom.alt = mealTitle;
        recipeMenu.appendChild(mealImageDom);
    }

// Initializers
function init() {
    document.addEventListener('DOMContentLoaded', () => {
        getRecipeData();
    })
}
init();

