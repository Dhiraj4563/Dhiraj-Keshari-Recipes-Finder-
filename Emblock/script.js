const apiKey = "c0e03c00f2f2435f8943d7398fc4410b";

// Function to fetch recipes from the API
const fetchRecipes = async (query) => {
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=10&addRecipeInformation=true`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
};

// Render recipes dynamically
const renderRecipes = (recipes) => {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";

    if (recipes.length === 0) {
        recipeList.innerHTML = "<p>No recipes found. Try a different search!</p>";
        return;
    }

    recipes.forEach((recipe) => {
        const recipeCard = `
            <div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <p>Ready in ${recipe.readyInMinutes} minutes | Servings: ${recipe.servings}</p>
                <p><a href="${recipe.sourceUrl}" target="_blank">View Recipe</a></p>
            </div>
        `;
        recipeList.innerHTML += recipeCard;
    });
};

// Handle search form submission
document.getElementById("search-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = document.getElementById("search-bar").value;
    if (query.trim()) {
        const recipes = await fetchRecipes(query);
        renderRecipes(recipes);
    }
});

// Initial load with a default query
(async () => {
    const defaultRecipes = await fetchRecipes("popular");
    renderRecipes(defaultRecipes);
})();
