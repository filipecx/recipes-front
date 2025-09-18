import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { RecipeCard } from "./RecipeCard";
import { AddRecipeModal } from "./AddRecipeModal";

export function ListCard ({title, description, listId, isExpanded, removeList}) {

  const [recipes, setRecipes] = useState([]);
  const [expandedAddRecipeModal, setExpandedAddRecipeModal] = useState(false)

  const [expandedListId, setExpandedListId] = useState(null)

  const fetchRecipes = async () => {
    setExpandedListId(expandedListId === listId ? null : listId)
    try {
      const response = await Axios.get(`http://localhost:8080/recipes/${listId}`)
      setRecipes(response.data)
    } catch(error) {
      console.error(error)
    }
  }

  const removeRecipe = async (recipeId) => {
    const oldData = [...recipes]
    setRecipes(recipes.filter((recipe) => recipe.id === recipeId))

    try {
      const response = await Axios.delete(`http://localhost:8080/recipes/recipe/${recipeId}`, {withCredentials: true})

    } catch(error) {
      console.error("Not able to remove recipe", error)
    }


  }

  

  useEffect(() => {
    fetchRecipes
  }, [recipes])

    return (
        <div >
          {/* for the time being, the trigger to open and close the list will be at the title, later, on a div*/}
          <h2 className="text-xl font-semibold" onClick={fetchRecipes}>{title}</h2>
          <button type="button" onClick={() => removeList(listId)}>Remove List</button>
          {
            expandedListId === listId ? <div>{recipes.map((recipe) => {
              return(
                <div>
                  <Link to={`/recipe/${recipe.id}`}><RecipeCard recipeTitle={recipe.name} key={recipe.id} recipeId={recipe.id}/> </Link>
                  <button type="button" onClick={() => removeRecipe(recipe.id)}>Remove recipe</button>
                  <Link to={`/editRecipe/${recipe.id}`}><button type="button" >Edit recipe</button></Link>
                </div>

              )

          })
          }
          <button onClick={() => setExpandedAddRecipeModal(expandedAddRecipeModal => !expandedAddRecipeModal)} type="button">{expandedAddRecipeModal ? <p>X</p> : <p>Add Recipe</p>}</button>
          <AddRecipeModal isAddRecipeOpen={expandedAddRecipeModal} listId={listId} />
          </div>: null
          }
          
        </div>
    )
}