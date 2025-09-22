import { RecipeComplete } from "../components/RecipeComplete";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Axios from "axios";
import { FaArrowLeft } from "react-icons/fa"


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
        <div  className="flex flex-col h-screen bg-secondary">
            <div className="w-full max-w-md mx-auto my-4 p-4 flex flex-col shadow-lg rounded-xl" >
                <Link to={"/"}><FaArrowLeft /></Link>
                {recipe.ingredients &&
                <RecipeComplete 
                name={recipe.name} 
                ingredients={recipe.ingredients} 
                key={recipe.id} 
                description={recipe.description}
                steps={recipe.steps} 
                listId={recipe.listId}/>}
                <Link to={`/editRecipe/${recipe.id}`}>
                <button className="w-full py-4 mt-10 cursor-pointer bg-black text-white rounded-lg" type="button" >Edit recipe</button>
                </Link>
            </div>
        </div>
    )
}