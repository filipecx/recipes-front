import { useEffect, useState } from "react";
import { ListCard } from "./ListCard";
import { RecipeCard } from "./RecipeCard";
import { Link } from "react-router";
import { AddListModal } from "./AddListModal";
import { AddRecipeModal } from "./AddRecipeModal";
import Axios from "axios";


export function ListsContainer() {
  const [lists, setLists] = useState([])
  const [recipes, setRecipes] = useState(["recipe 1", "recipe 2"])
  const [isExpanded, setExpansion] = useState(false)
  const [isAddListOpen, setAddListOpen] = useState(false)
  const [isAddRecipeOpen, setAddRecipesOpen] = useState(false)

  //make a get here. Shoud i get the lists and the recipes names in the same request?
  const data = {title: "Base List", description: "A standart list for your recipies" }
  const fetchLists = async () => {
    try {
      const response = await Axios.get(`http://localhost:3000`)
      setLists(lists)
    } catch(error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
  //  setLists(lists => [...lists, data])
    fetchLists()
  }, [])

  return (
    <div className="w-full max-w-md mx-auto my-4 p-4 cursor-pointer">
      <div
        className="flex justify-between items-center"
        
      >
        {
          lists.map((list) => {
            return (        
              <div>
                <div  onClick={() => setExpansion(!isExpanded)}>
                  <ListCard title={list.title} description={list.description}/>
                </div>
                <button onClick={() => setAddRecipesOpen(!isAddRecipeOpen)} type="button">{isAddRecipeOpen ? <p>X</p> : <p>Add Recipe</p>}</button>
                <AddRecipeModal isAddRecepiOpen={isAddRecipeOpen} />
                {isExpanded ? recipes.map((recipe) => <Link to={`/recipe`}><RecipeCard recipeTitle={recipe} /> </Link> ): "Click to expand"}
              </div>
          )
          })
        }
        <div onClick={() => setAddListOpen(!isAddListOpen)}>
          
          { isAddListOpen ? <p>X</p> : <p>Add List</p>}
        </div>
        <AddListModal isOpen={isAddListOpen}/>
        
      </div>
    </div>
  );
}
