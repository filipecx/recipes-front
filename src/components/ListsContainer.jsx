import { useEffect, useState } from "react";
import { ListCard } from "./ListCard";
import { RecipeCard } from "./RecipeCard";
import { Link } from "react-router";


export function ListsContainer() {
  const [lists, setLists] = useState([])
  const [recipes, setRecipes] = useState(["recipe 1", "recipe 2"])
  const  [isExpanded, setExpansion] = useState(false)

  //make a get here. Shoud i get the lists and the recipes names in the same request?
  const data = {title: "Base List", description: "A standart list for your recipies" }

  useEffect(() => {
    setLists(lists => [...lists, data])

  }, data)

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
                {isExpanded ? recipes.map((recipe) => <Link to={`/recipe`}><RecipeCard recipeTitle={recipe} /> </Link> ): "Click to expand"}
              </div>
          )
          })
        }
      </div>
    </div>
  );
}
