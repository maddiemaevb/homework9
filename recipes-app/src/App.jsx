import { useEffect, useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://api.sampleapis.com/recipes/recipes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Recipes</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <div>
          {recipes.slice(0, 10).map((recipe, index) => (
            <div key={recipe.id || index}>
              <h2>{recipe.title}</h2>

              {recipe.image && (
                <img src={recipe.image} alt={recipe.title} width="200" />
              )}

              <p>
                <strong>Servings:</strong> {recipe.servings}
              </p>

              <p>
                <strong>Ingredients:</strong>
              </p>
              <ul>
                {Array.isArray(recipe.ingredients) &&
                  recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
              </ul>

              <p>
                <strong>Instructions:</strong>
              </p>
              <p>
                {Array.isArray(recipe.instructions)
                  ? recipe.instructions.join(" ")
                  : recipe.instructions}
              </p>

              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;