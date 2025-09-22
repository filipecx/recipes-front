import  Axios  from "axios"
import { useState } from "react"
import { FormInput } from "./FormInput"
import { useNavigate } from "react-router"

export function AddRecipeModal({ isAddRecipeOpen, listId, setExpandedAddRecipeModal, setRecipes, recipes }) {

    const [error, setError] = useState('')
    const [name, setName] = useState("")

    const [ingredientData, setIngredientData] = useState({name: "", quantity: ""})
    const [arrayOfIngredients, setArrayOfIngredients] = useState([])

    const [stepData, setStepData] = useState({number: "", text: ""})
    const [arrayOfSteps, setArrayOfSteps] = useState([])

    const [description, setDescription] = useState({text: "", makes: "", time: ""})

    const addIngredientDataToArray = (ingredientData) => {
        setArrayOfIngredients(arrayOfIngredients => [...arrayOfIngredients, ingredientData])
        setIngredientData({name: '', quantity: ''})
    }

     const removeLastIngredient = () => {
        setArrayOfIngredients(arrayOfIngredients => arrayOfIngredients.slice(0, -1))
    }

    const addStepDataToArray = (stepData) => {
        setArrayOfSteps(arrayOfSteps => [...arrayOfSteps, stepData])
        setStepData({text: ""})
    }

    const removeLastStep = () => {
        setArrayOfSteps(arrayOfSteps => arrayOfSteps.slice(0, -1))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const recipeInfo = {
            name: name, 
            ingredients: arrayOfIngredients,
            steps: arrayOfSteps,
            description: description
        }
        const isEmpty = Object.values(recipeInfo).some(value => value === "")

        if (isEmpty) {
            setError("All field must be filled")
            return 
        }

        setRecipes([...recipes, recipeInfo])

        try {
            const response = await Axios.post(`http://localhost:8080/recipes`, {
                name: name,
                ingredients: arrayOfIngredients,
                steps: arrayOfSteps,
                description: description,
                listId: listId
            }, 
            {
                headers: {"Content-Type": "application/json"}, withCredentials: true
            }
            )
            setExpandedAddRecipeModal("")
        } catch (error) {
            console.error(error, "Failed to add recipe")
        }
        
    }

    const handleError = async (e) => {

    }

    
    if (isAddRecipeOpen) {
        return (
            <div className="flex h-screen bg-secondary justify-center">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">
                        <p>Recipe Title</p>
                        <input 
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
                        type="text" 
                        name="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">
                        <p>Ingredients</p></label>
                    {
                        arrayOfIngredients && arrayOfIngredients.map((ingredient, index) => {
                            return (
                                <div key={index}>
                                    {ingredient.name}
                                    {ingredient.quantity}
                                </div>
                            )
                        })
                    }   

                    
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">Ingredient

                        <FormInput 
                        input_name={"ingredient_name"}
                        input_value={ingredientData.name}
                        setRecipeData={setIngredientData}
                        recipeData={ingredientData}
                        property={"name"}
                        
                    />
                      {/* 
                        <input 
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
                        type="text" 
                        name="ingredient_name" 
                        value={ingredientData.name} 
                        onChange={(e) => setIngredientData({...ingredientData, name: e.target.value})} />
                        */}  
                        </label>
                        
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">Quantity

                        
                    {/*
                        <input 
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
                        type="text" 
                        name="ingredient_quantity" 
                        value={ingredientData.quantity} 
                        onChange={(e) => setIngredientData({...ingredientData, quantity: e.target.value})} />    

                        */}  
                    </label>
                    <FormInput 
                        input_name={"ingredient_quantity"}
                        input_value={ingredientData.quantity}
                        setRecipeData={setIngredientData}
                        recipeData={ingredientData}
                        property={"quantity"}
                        
                    />

                    <button 
                    className="w-full bg-green-200 text-white py-2 rounded-lg hover:bg-green-600"
                    type="button" 
                    onClick={() => addIngredientDataToArray(ingredientData)}>Add ingredient</button>
                    
                    <button
                    className="w-full bg-red-200 text-white py-2 rounded-lg hover:bg-red-600" 
                    type="button" 
                    onClick={removeLastIngredient}>Remove last ingredient</button>

                    <label htmlFor="" className="block text-sm font-medium text-gray-700">
                        <p>Steps</p>
                        {
                            arrayOfSteps && arrayOfSteps.map((step, index) => {
                                return (
                                    <div key={index}>
                                        {step.number}
                                        {step.text}
                                    </div>
                                )
                            })
                        }
                    <input 
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
                    type="text" 
                    name="steps" 
                    value={stepData.text} 
                    onChange={(e) => setStepData({...stepData, number: arrayOfSteps?.length + 1, text: e.target.value})}/>
                    </label>

                    <button 
                    className="w-full bg-green-200 text-white py-2 rounded-lg hover:bg-green-600"
                    type="button" 
                    onClick={() => addStepDataToArray(stepData)}>Add step</button>

                    <button 
                    className="w-full bg-red-200 text-white py-2 rounded-lg hover:bg-red-600"
                    type="button" 
                    onClick={removeLastStep}>Remove last step</button>

                    
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">
                        <p>Description</p>
                        <FormInput 
                        input_name={"text"}
                        input_value={description.text}
                        setRecipeData={setDescription}
                        recipeData={description}
                        property={"text"}
                        
                    />
                    
                        <p>Servings</p>
                        <FormInput 
                        input_name={"makes"}
                        input_value={description.makes}
                        setRecipeData={setDescription}
                        recipeData={description}
                        property={"makes"}
                        />
                       
                        <p>Total time</p>
                        
                        <FormInput 
                        input_name={"time"}
                        input_value={description.time}
                        setRecipeData={setDescription}
                        recipeData={description}
                        property={"time"}
                        />
                    </label>
                    {error && <p className="text-red-500">{error}</p>}
                    <button 
                    className="w-full bg-green-200 text-white py-2 rounded-lg hover:bg-green-600"
                    type="submit">Add Recipe</button>
                </form>
            </div>
        )
    }   
}