import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { RecipeCard } from "./RecipeCard";
import { AddRecipeModal } from "./AddRecipeModal";
import { FaRegTrashAlt, FaEdit, FaRegWindowClose    } from "react-icons/fa"

export function ListCard ({title, description, listId, isExpanded, removeList, editList, currentListName}) {

  const [recipes, setRecipes] = useState([]);
  const [expandedAddRecipeModal, setExpandedAddRecipeModal] = useState(false)
  const [expandedEditListModal, setExpandedEditListModal] = useState(false)
  const [expandedListId, setExpandedListId] = useState(null)
  const [listName, setListName] = useState("")

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
              <button type="button" className="px-6 cursor-pointer" onClick={() => removeList(listId)}><FaRegTrashAlt /></button>
              <button type="button" className="px-1 cursor-pointer" onClick={() => setExpandedEditListModal(expandedEditListModal => !expandedEditListModal)}><FaEdit /></button>
            </div>
            </div>
            <div>
              {
              expandedListId === listId ? <div>{recipes.map((recipe) => {
                return(
                  <div className="flex justify-between px-2 py-4 border border-green-500 bg-green-500 rounded-md my-4 text-gray-50 font-semibold">
                    <div >
                      <Link to={`/recipe/${recipe.id}`}><RecipeCard recipeTitle={recipe.name} key={recipe.id} recipeId={recipe.id}/> </Link>
                    </div>
                    <div className="flex justify-around">
                      <button className="px-6 cursor-pointer" type="button" onClick={() => removeRecipe(recipe.id)}><FaRegTrashAlt /></button>
                      <Link to={`/editRecipe/${recipe.id}`}><button type="button" className="cursor-pointer"><FaEdit /></button></Link>
                    </div>
                  </div>

                )

            })
            }
            <button 
            onClick={() => setExpandedAddRecipeModal(expandedAddRecipeModal => !expandedAddRecipeModal)} 
            type="button"
            className="w-full bg-green-200 text-white py-2 rounded-lg hover:bg-green-600 cursor-pointer"
            >
            {expandedAddRecipeModal ? <div className="flex justify-center text-3xl cursor-pointer"><FaRegWindowClose /></div> : <p>Add Recipe</p>}</button>
            <AddRecipeModal 
            isAddRecipeOpen={expandedAddRecipeModal} 
            listId={listId} 
            setRecipes={setRecipes} 
            recipes={recipes} 
            setExpandedAddRecipeModal={setExpandedAddRecipeModal}/>
            </div>: null
         }
          {
            expandedEditListModal && 

            <form className="w-4/5 max-w-md space-y-6" onSubmit={(e) => editList(e, listId, listName)}>
                    <label htmlFor="">
                        List name 
                    <input
                    required
                    value={currentListName}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
                    type="text"  onChange={(e) => setListName(e.target.value)}/>
                    </label>

                    <button
                    className="my-2 w-full bg-green-200 text-white py-2 rounded-lg hover:bg-green-600"
                    type="submit">Update list</button>

                    <button type="button" onClick={() => setExpandedEditListModal(expandedEditListModal => !expandedEditListModal)}><FaRegWindowClose /></button>
                </form>
          }
            </div>
          
          
      </div>
        
    )
}