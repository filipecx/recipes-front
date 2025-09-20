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
      <div className="flex-col shadow-lg rounded-xl p-4">
          <div className="flex justify-between">
            {/* for the time being, the trigger to open and close the list will be at the title, later, on a div*/}
            <div >
              <h2 className="text-xl font-semibold" onClick={fetchRecipes}>{title}</h2>

              
            </div>
            
            <div className="flex justify-end">
              <button type="button" onClick={() => removeList(listId)}>Remove</button>
              <button type="button">edit</button>
            </div>
            </div>
            <div>
              {
              expandedListId === listId ? <div>{recipes.map((recipe) => {
                return(
                  <div className="flex justify-between px-2 py-4 border border-green-500 bg-green-500 rounded-md my-4">
                    <div >
                      <Link to={`/recipe/${recipe.id}`}><RecipeCard recipeTitle={recipe.name} key={recipe.id} recipeId={recipe.id}/> </Link>
                    </div>
                    <div className="flex justify-around">
                      <button className="px-6" type="button" onClick={() => removeRecipe(recipe.id)}>R</button>
                      <Link to={`/editRecipe/${recipe.id}`}><button type="button" >E</button></Link>
                    </div>
                  </div>

                )

            })
            }
            <button onClick={() => setExpandedAddRecipeModal(expandedAddRecipeModal => !expandedAddRecipeModal)} type="button">{expandedAddRecipeModal ? <p>X</p> : <p>Add Recipe</p>}</button>
            <AddRecipeModal isAddRecipeOpen={expandedAddRecipeModal} listId={listId} />
            </div>: null
            }
            </div>
          
          
      </div>
        
    )
}