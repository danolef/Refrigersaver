// DOM Selectors
const baseUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
const mealLookupUrl ='https://www.themealdb.com/api/json/v1/1/lookup.php?i='
const inputIngredient = document.querySelector('#ingredient-search')
const recipeMenu = document.querySelector('#recipe-menu')
const searchIngredientForm = document.querySelector('#search-form')
const ingredientList = document.querySelector('#ingredientList')
const recipeDetailImg= document.querySelector('#recipeDetailImage')
const recipeDetailName= document.querySelector("#recipeName")
const recipeDetailInstructions= document.querySelector("#recipeInstructions")
<<<<<<< HEAD
const detailDiv = document.querySelector('#recipe-detail')
// const favoriteButton= document.querySelector("#favoriteButton")
// const url= "http://localhost:3000/resources"
=======
const favoriteButton= document.querySelector("#favoriteButton")
const url= "http://localhost:3000/resources"
>>>>>>> 2dc42f015c6e415bf71dea49f4cf8a3f82c1415f

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

    mealImageContainer.addEventListener('click', () => renderMealDetails(meal))

    mealImageTitle.textContent = mealTitle;
    mealImageDom.src = mealImage;
    mealImageDom.alt = mealTitle;
    mealImageContainer.id = 'mealImageContainer';
    mealImageContainer.appendChild(mealImageDom);
    mealImageContainer.appendChild(mealImageTitle);
    recipeMenu.appendChild(mealImageContainer);
}

function renderMealDetails(meal) {
    let mealUrl = mealLookupUrl + `${meal.idMeal}`
    //console.log(meal.idMeal)
    fetch(mealUrl)
    .then(r => r.json())
    .then(mealDetailObj => {
        console.log(mealDetailObj)
        const mealObj = mealDetailObj.meals[0]

        let ingredientsListArray = []

        for(let i = 1; i <= 20; i++) {
            if (mealObj["strIngredient" + i] ) {
                ingredientsListArray.push(`${mealObj[`strIngredient${i}`]} : ${mealObj[`strMeasure${i}`]}`)
            } else {
                break;
            }
        }
        console.log(ingredientsListArray)

        
        ingredientList.innerHTML= ""
<<<<<<< HEAD

        recipeDetailImg.src= mealObj.strMealThumb
        recipeDetailName.textContent= mealObj.strMeal
        recipeDetailInstructions.textContent= mealObj.strInstructions

=======

        recipeDetailImg.src= mealObj.strMealThumb
        recipeDetailName.textContent= mealObj.strMeal
        recipeDetailInstructions.textContent= mealObj.strInstructions

>>>>>>> 2dc42f015c6e415bf71dea49f4cf8a3f82c1415f
 
        ingredientsListArray.forEach(ingredient => {
            
            const ingredientListItem = document.createElement("li")
            

            ingredientListItem.innerText = ingredient
            ingredientList.appendChild(ingredientListItem)
            
    
            // console.log(ingredient)


        });

<<<<<<< HEAD
        const favoriteButton = document.createElement('button')
        favoriteButton.textContent = 'Add to Favorites!'
        detailDiv.appendChild(favoriteButton)
        
        favoriteButton.addEventListener("click", () => addToFavorite(mealObj) )
=======
        favoriteButton.addEventListener("click", ()=> AddtoFavorite(mealObj))
>>>>>>> 2dc42f015c6e415bf71dea49f4cf8a3f82c1415f
    })
}

// Event Handler

function addToFavorite(mealObj) {
    // let keysObj= Object.keys(mealObj)
    // let values= Object.values(mealObj)
    // let favoriteMealObj= {
    //     keysObj : values,
    // }
    
<<<<<<< HEAD
    console.log(mealObj)

    let newMealObj = {
        id: "",
        dateModified: null,
        idMeal: "53053",
        strArea: "Malaysian",
        strCategory: "Beef",
        strCreativeCommonsConfirmed: null,
        strDrinkAlternate: null,
        strImageSource: null,
        strIngredient1: "Beef",
        strIngredient2: "Vegetable Oil",
        strIngredient3: "Cinnamon Stick",
        strIngredient4: "Cloves",
        strIngredient5: "Star Anise",
        strIngredient6: "Cardamom",
        strIngredient7: "Coconut Cream",
        strIngredient8: "Water",
        strIngredient9: "Tamarind Paste",
        strIngredient10: "Lime",
        strIngredient11: "Sugar",
        strIngredient12: "Challots",
        strIngredient13: "",
        strIngredient14: "",
        strIngredient15: "",
        strIngredient16: "",
        strIngredient17: "",
        strIngredient18: "",
        strIngredient19: "",
        strIngredient20: "",
        strInstructions: "Chop the spice paste ingredients and then blend it in a food processor until fine.\r\nHeat the oil in a stew pot, add the spice paste, cinnamon, cloves, star anise, and cardamom and stir-fry until aromatic. Add the beef and the pounded lemongrass and stir for 1 minute. Add the coconut milk, tamarind juice, water, and simmer on medium heat, stirring frequently until the meat is almost cooked. Add the kaffir lime leaves, kerisik (toasted coconut), sugar or palm sugar, stirring to blend well with the meat.\r\nLower the heat to low, cover the lid, and simmer for 1 to 1 1/2 hours or until the meat is really tender and the gravy has dried up. Add more salt and sugar to taste. Serve immediately with steamed rice and save some for overnight.",
        strMeal: "Beef Rendang",
        strMealThumb: "https://www.themealdb.com/images/media/meals/bc8v651619789840.jpg",
        strMeasure1: "1lb",
        strMeasure2: "5 tbs",
        strMeasure3: "1",
        strMeasure4: "3",
        strMeasure5: "3",
        strMeasure6: "3",
        strMeasure7: "1 cup ",
        strMeasure8: "1 cup ",
        strMeasure9: "2 tbs",
        strMeasure10: "6",
        strMeasure11: "1 tbs",
        strMeasure12: "5",
        strMeasure13: " ",
        strMeasure14: " ",
        strMeasure15: " ",
        strMeasure16: " ",
        strMeasure17: " ",
        strMeasure18: " ",
        strMeasure19: " ",
        strMeasure20: " ",
        strSource: "https://rasamalaysia.com/beef-rendang-recipe-rendang-daging/",
        strTags: null,
        strYoutube: "https://www.youtube.com/watch?v=Ot-dmfBaZrA",
    }

    // const postrecipe = {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     Body: mealObj,
    // }

    // console.log("mealObj:", favoriteMealObj)

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
=======
}

// Event Handler

function AddtoFavorite(mealObj) {
    // let keysObj= Object.keys(mealObj)
    // let values= Object.values(mealObj)
    // let favoriteMealObj= {
    //     keysObj : values,
    // }

    const favoriteMealObj= {
        strMeal: mealObj.strMeal
    }

    const postrecipe = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        Body: JSON.stringify(favoriteMealObj)
    }

    // console.log("mealObj:", favoriteMealObj)

    fetch (url, postrecipe)
    .then (res => res.json())
    .catch ((error) => console.error("error:", error))
    .then ((resObj)=> console.log(resObj))

}
>>>>>>> 2dc42f015c6e415bf71dea49f4cf8a3f82c1415f


// Initializers


