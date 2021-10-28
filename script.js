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
const favoriteCommentTitleDOM = document.querySelector('#commentDisplayTitle')
const favoriteCommentForm = document.querySelector('#commentRecipe')
const favoriteCommentList = document.querySelector('#commentDisplay')
const recipeIngredients= document.querySelector("#recipeIngredients")
let globalMeal;

// EventListeners
searchIngredientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let ingredient = document.querySelector('#ingredient-search').value;
    getRecipeData(ingredient);
    searchIngredientForm.reset();
})

favoriteCommentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addComment(globalMeal);
    favoriteCommentForm.reset();
})

// Fetch Functions
function getRecipeData(ingredient) {
    let newUrl = baseUrl + `${ingredient}`
    fetch(newUrl)
    .then(r => r.json())
    .then(mealsObjectWithArray => {
        let mealsArray = mealsObjectWithArray.meals;
        recipeMenu.innerHTML = '',
        mealsArray.forEach(renderRecipes)
    })
}

function getFavoritesData() {
    fetch(favoritesUrl)
    .then(r => r.json())
    .then(renderFavoritesArray)
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
    let mealImageTitle = document.createElement('p');

    mealImageContainer.addEventListener('click', () => renderRecipeDetails(meal));

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
    ingredientList.innerHTML = ""
    favBttn.innerHTML = ""
    recipeDetailImg.src = mealObj.strMealThumb
    recipeDetailName.textContent = mealObj.strMeal
    recipeDetailInstructions.textContent = mealObj.strInstructions
    recipeIngredients.style.display= "block";
    ingredientList.style.display= "block";

    // ingredients appending to DOM
    ingredientsListArray.forEach(ingredient => {
        const ingredientListItem = document.createElement("li")
        ingredientListItem.innerText = ingredient
        ingredientList.appendChild(ingredientListItem)
    });
}

function renderFavoritesArray(favoriteMealArray){
    favoriteMealArray.forEach(renderFavorites)
}

function renderFavorites(meal){
    const favoriteContainer = document.createElement('div');
    const favoriteImage = document.createElement('img');
    const favoriteTitle = document.createElement('p');

    favoriteImage.src = meal.strMealThumb;
    favoriteImage.alt = meal.strMeal;
    favoriteTitle.textContent = meal.strMeal;
    favoriteContainer.className = 'favoriteContainer'
    
    favoriteContainer.appendChild(favoriteImage)
    favoriteContainer.appendChild(favoriteTitle)
    favoriteList.appendChild(favoriteContainer)
    
    favoriteContainer.addEventListener('click', (e) => {
        renderFavoriteDetails(meal)
        e.stopImmediatePropagation();
    })
}

// Event Handler

function addToFavorite(mealObj) {

    let newCommentObj = {
        comment: "",
    }
    let newMealObj = {...mealObj, ...newCommentObj}

    fetch ('http://localhost:3000/resources', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newMealObj)
    })
    .then (res => res.json())
    .catch ((error) => console.error("error:", error))
    .then ((resObj)=> renderFavorites(resObj))
}

function renderFavoriteDetails(meal) {
    
    favoriteCommentTitleDOM.style.display = "block";
    renderDetails(meal);
    favoriteCommentList.innerHTML = ""
    favoriteCommentList.textContent = meal.comment;
    globalMeal = meal;
}

function addComment(meal) {
    let comment = document.querySelector('#newComment').value;
    favoriteCommentList.textContent = comment

    meal.comment = comment
    
    fetch (favoritesUrl + `/${meal.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(meal)
    })
    .then(res => res.json())
    .then(console.log)
}

// Initializers
getFavoritesData();
