import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Axios from 'axios'
import { Link } from "react-router";

export function EditRecipe () {
    const [error, setError] = useState('')
    
    const [recipeForm, setRecipeForm] = useState({
        name: '',
        ingredients: [{name: '', quantity: ''}],
        steps: [{number: '', text: ''}],
        description: {text: '', makes: '', time: ''},

})
    const [arrayOfIngredients, setArrayOfIngredients] = useState([{name: '', quantity: ''}])
    const [arrayOfSteps, setArrayOfSteps] = useState([{number: '', text: ''}])

    const {recipeId} = useParams();

    const fetchRecipe = async () => {
            console.log("fetch")
            try {
                const response = await Axios.get(`http://localhost:8080/recipes/recipe/${recipeId}`)
                
                setRecipeForm(response.data)
                setArrayOfIngredients(response.data.ingredients)
                setArrayOfSteps(response.data.steps)
            } catch(error) {
                console.error(error)
            }
        }

    const sendChanges = async (e) => {
        e.preventDefault()

        const recipeInfo = {
            name: recipeForm.name, 
            ingredients: arrayOfIngredients,
            steps: arrayOfSteps,
            description: recipeForm.description
        }
        const isEmpty = Object.values(recipeInfo).some(value => value === "")

        if (isEmpty) {
            setError("All field must be filled")
            return 
        }

        try {
            const response = await Axios.put(`http://localhost:8080/recipes/recipe/${recipeId}`, {
                
                name: recipeForm.name,
                ingredients: arrayOfIngredients,
                steps: arrayOfSteps,
                description: recipeForm.description,
                listId: recipeForm.listId
            }, {
               headers: {"Content-Type": "application/json"}, withCredentials: true
            }
            )
            
        } catch (error) {
            console.error("Could not update recipe", error)
        }
    }

    const handleSubmit = async () => {
        console.log("submit")
    }

    const addIngredientInput = () => {
        setArrayOfIngredients([...arrayOfIngredients, {name: '', quantity: ''}])
    }

    const addStepInput = () => {
        setArrayOfSteps(arrayOfSteps => [...arrayOfSteps, {number: '', text: ''}])
    }

    const handleChange = (e, index, array) => {
        console.log(e.target.name)
        const data = [...array]
        data[index][e.target.name] = e.target.value

        if (e.target.name !== 'text') {
            setArrayOfIngredients(data)
            return
        }

        setArrayOfSteps(data)
        
    }


    const removeField = (index) => {
        const newFields = arrayOfIngredients.filter((ing, i) => i !== index)
        setArrayOfIngredients(newFields)
    }

    const removeLastStep = () => {
        const newSteps = arrayOfSteps.slice(0, -1)
        setArrayOfSteps(newSteps)
    }

    useEffect(() => {
        fetchRecipe()
    }, [recipeId])

    return (
        
        <div className="flex h-screen bg-secondary justify-center ">
            <Link to={"/"}>Home</Link>
                <form className="w-4/5 max-w-md space-y-6" onSubmit={sendChanges}>
                    <label htmlFor="">
                        <p>Recipe Title</p>
                        <input
                        required 
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
                        type="text" 
                        name="name" 
                        value={recipeForm.name} 
                        onChange={(e) => setRecipeForm({...recipeForm, name: e.target.value})}/>
                    </label>
                    <label htmlFor="">
                        <p>Ingredients</p>
                    {
                        arrayOfIngredients && arrayOfIngredients.map((ingredient, index) => {
                            return (
                                <div key={index}>
                                    <label name="ingredient_name">Ingredient</label>
                                    <input 
                                    required
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
                                    type="text" 
                                    value={ingredient.name}
                                    name='name' 
                                    onChange={(e) => handleChange(e, index, arrayOfIngredients)}/>
                                    <label name="ingredient_quantity">Quantity</label>
                                    <input 
                                    required
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
                                    type="text" 
                                    value={ingredient.quantity} 
                                    name='quantity' 
                                    onChange={(e) => handleChange(e, index, arrayOfIngredients)} />
                                    <button 
                                    className="w-full bg-red-200 text-white my-2 py-2 rounded-lg hover:bg-red-600" 
                                    type="button" onClick={() => removeField(index)}>Remove field</button>        
                                </div>
                            )
                        })
                    }
                    <button 
                    className="w-full bg-green-200 text-white py-2 rounded-lg hover:bg-green-600"
                    type="button" onClick={addIngredientInput}>Add another ingredient</button> 
                    </label> 
                    
                        
                    <label htmlFor="">
                        <p>Steps</p>
                    </label>
                        {
                            arrayOfSteps && arrayOfSteps.map((step, index) => {
                                return (
                                    <div key={index}>
                                        <label name="text"></label>
                                        <input 
                                        required
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
                                        type="text"
                                        value={step.text}
                                        name="text" 
                                        onChange={(e) => handleChange(e, index, arrayOfSteps)}/>                                     
                                    </div>
                                )
                            })
                        }
                        <button 
                        className="w-full bg-green-200 text-white py-2 rounded-lg hover:bg-green-600"
                        type="button" onClick={addStepInput}>Add step</button>
                        <button
                        className="w-full bg-red-200 text-white py-2 rounded-lg hover:bg-red-600" 
                        type="button" onClick={removeLastStep}>Remove last step</button>
                       
                   
                    <label htmlFor="">Description</label>
                    {/* changin state of nested object */}
                    <input 
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
                    type="text" 
                    name="text" 
                    value={recipeForm.description.text} 
                    onChange={(e) => setRecipeForm({...recipeForm, description: {...recipeForm.description, text: e.target.value}})}/>
                    
                    <label htmlFor="">Servings</label>
                    <input 
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
                    type="text" 
                    name="makes" 
                    value={recipeForm.description.makes} 
                    onChange={(e) => setRecipeForm({...recipeForm, description: {...recipeForm.description, makes: e.target.value}})}/>
                    
                    <label htmlFor="">Total time</label>
                    <input 
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
                    type="text" 
                    name="time" 
                    value={recipeForm.description.time} 
                    onChange={(e) => setRecipeForm({...recipeForm, description: {...recipeForm.description, time: e.target.value}})}/>
                    
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                    className="w-full bg-green-200 text-white py-2 rounded-lg hover:bg-green-600"
                    type="submit">Edit Recipe</button>
                </form>
            </div>
    )
}