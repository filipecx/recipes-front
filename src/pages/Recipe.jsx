import { RecipeComplete } from "../components/RecipeComplete";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Axios from "axios";

export function Recipe() {
  const {recipeId} = useParams()
  const [recipe, setRecipe] = useState({})
  
    
    const fetchRecipe = async () => {
        console.log("fetch")
        try {
            const response = await Axios.get(`http://localhost:8080/recipes/recipe/${recipeId}`)
            
            setRecipe(response.data)
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchRecipe()
        console.log(recipe)

    }, [])

    return (
        <div>
            <Link to={"/"}>Voltar</Link>
            {recipe.ingredients &&
             <RecipeComplete 
             name={recipe.name} 
             ingredients={recipe.ingredients} 
             key={recipe.id} 
             description={recipe.description}
             steps={recipe.steps} 
             listId={recipe.listId}/>}
            <Link to={`/editRecipe/${recipe.id}`}><button type="button" >Edit recipe</button></Link>
        </div>
    )
}