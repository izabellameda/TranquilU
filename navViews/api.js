async function fetchPastaRecipe() {
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=`;
  const apiKeyURL = '&apiKey=8c4e4b4e364248a2ab010c1ae5720d66';
  const searchTerm = inputBox.value.trim();
  if(!searchTerm) {
    return;
  }
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const response = await fetch(url + encodedSearchTerm + apiKeyURL);
  const data = await response.json();

  const recipes = data?.results;
  if (recipes && recipes.length > 0) {
    const recipeContainer = document.getElementById("the_recipe");
    recipeContainer.innerHTML = '';

    recipes.forEach(recipe => {
      const recipeName = recipe.title;
      const recipeImage = recipe.image;

      const recipeElement = document.createElement("div");
      recipeElement.classList.add("recipe-item");

      const nameElement = document.createElement("p");
      nameElement.textContent = recipeName;

      const imageElement = document.createElement("img");
      imageElement.src = recipeImage;

      recipeElement.appendChild(nameElement);
      recipeElement.appendChild(imageElement);

      recipeContainer.appendChild(recipeElement);
    });
  } else {
    const recipeContainer = document.getElementById("the_recipe");
    recipeContainer.innerHTML = '<p>No recipes found</p>';
  }
}

const inputBox = document.getElementById('search');
const getButton = document.getElementById("fetch-pasta-recipe");
getButton.addEventListener('click', fetchPastaRecipe);