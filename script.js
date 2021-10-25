const baseUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast'

function getRecipeData() {
    fetch(baseUrl)
    .then(r => r.json())
    .then(console.log)
}

getRecipeData();