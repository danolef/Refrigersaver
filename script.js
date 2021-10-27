// DOM Selectors
const baseUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
const mealLookupUrl ='https://www.themealdb.com/api/json/v1/1/lookup.php?i='
const favoritesUrl = 'http://localhost:3000/resources'
const inputIngredient = document.querySelector('#ingredient-search')
const recipeMenu = document.querySelector('#recipe-menu')
const searchIngredientForm = document.querySelector('#search-form')
const ingredientList = document.querySelector('#ingredientList')
const recipeDetailImg= document.querySelector('#recipeDetailImage')
const recipeDetailName= document.querySelector("#recipeName")
const recipeDetailInstructions= document.querySelector("#recipeInstructions")
const detailDiv = document.querySelector('#recipe-detail')
const favBttn = document.querySelector('#favoriteBttn')
const favoriteList = document.querySelector('#favoriteList')

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

function getFavoritesData() {
    fetch(favoritesUrl)
    .then(r => r.json())
    .then(renderFavorites)
}

// Render Functions
function renderRecipes(meal) {
            
    let newMealObject = {
        id: meal.idMeal,
        image: meal.strMealThumb,
        title: meal.strMeal,
    }


    let mealImage = newMealObject.image;
    let mealTitle = newMealObject.title;
    let mealImageDom = document.createElement('img');
    let mealImageContainer = document.createElement('div');
    let mealImageTitle = document.createElement('p')

    mealImageContainer.addEventListener('click', () => renderRecipeDetails(meal))

    mealImageTitle.textContent = mealTitle;
    mealImageDom.src = mealImage;
    mealImageDom.alt = mealTitle;
    mealImageContainer.id = 'mealImageContainer';
    mealImageContainer.appendChild(mealImageDom);
    mealImageContainer.appendChild(mealImageTitle);
    recipeMenu.appendChild(mealImageContainer);
}

function renderRecipeDetails(meal) {
    let mealUrl = mealLookupUrl + `${meal.idMeal}`
    //console.log(meal.idMeal)
    fetch(mealUrl)
    .then(r => r.json())
    .then(mealDetailObj => {
        // console.log(mealDetailObj)
        const mealObj = mealDetailObj.meals[0]
        renderDetails(mealObj);

        // Favorite Button Creation
        const favoriteButton = document.createElement('button')
        favoriteButton.textContent = 'Add to Favorites!'
        favBttn.appendChild(favoriteButton)
        favoriteButton.addEventListener("click", () => addToFavorite(mealObj))
        
    })
}

function renderDetails(mealObj) {
    let ingredientsListArray = []

    for(let i = 1; i <= 20; i++) {
        if (mealObj["strIngredient" + i] ) {
            ingredientsListArray.push(`${mealObj[`strIngredient${i}`]} : ${mealObj[`strMeasure${i}`]}`)
        } else {
            break;
        }
    }
    
    // Appending mealObj info to DOM
    ingredientList.innerHTML= ""
    favBttn.innerHTML = ""
    recipeDetailImg.src= mealObj.strMealThumb
    recipeDetailName.textContent= mealObj.strMeal
    recipeDetailInstructions.textContent= mealObj.strInstructions

    // ingredients appending to DOM
    ingredientsListArray.forEach(ingredient => {
        const ingredientListItem = document.createElement("li")
        ingredientListItem.innerText = ingredient
        ingredientList.appendChild(ingredientListItem)
    });
}

function renderFavorites(favoriteMealArray){
    favoriteMealArray.forEach(meal => {
        const favoriteContainer = document.createElement('div');
        const favoriteImage = document.createElement('img');
        const favoriteTitle = document.createElement('p');

        favoriteImage.src = meal.strMealThumb;
        favoriteImage.alt = meal.strMeal;
        favoriteTitle.textContent = meal.strMeal;
        favoriteContainer.id = 'favoriteContainer'

        favoriteContainer.appendChild(favoriteImage)
        favoriteContainer.appendChild(favoriteTitle)
        favoriteList.appendChild(favoriteContainer)

        favoriteContainer.addEventListener('click', () => renderDetails(meal))
    })
}

// Event Handler

function addToFavorite(mealObj) {

    fetch ('http://localhost:3000/resources', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(mealObj)
    })
    .then (res => res.json())
    .catch ((error) => console.error("error:", error))
    .then ((resObj)=> console.log('res Obj:', resObj)
    )}

// Initializers
getFavoritesData();

