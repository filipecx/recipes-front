import Axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { RecipeCard } from "./RecipeCard";

export function ListCard ({title, description, listId, isExpanded}) {

  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await Axios.get(`http://localhost:8080/recipes/${listId}`)
      setRecipes(response.data)
    } catch(error) {
      console.error(error)
    }
  }
    return (
        <div onClick={fetchRecipes}>
          <h2 className="text-xl font-semibold">{title}</h2>
          {isExpanded ? recipes.map((recipe) => <Link to={`/recipe/${recipe.id}`}><RecipeCard recipeTitle={recipe.name} key={recipe.id} recipeId={recipe.id}/> </Link> ): "Click to expand"
          }

        </div>
    )
}