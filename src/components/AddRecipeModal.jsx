import { useState } from "react"

export function AddRecipeModal({ isAddRecepiOpen }) {
    const [name, setName] = useState("")

    const [ingredientData, setIngredientData] = useState({name: "", quantity: ""})
    const [arrayOfIngredients, setArrayOfIngredients] = useState([])

    const [stepData, setStepData] = useState({number: "", text: ""})
    const [arrayOfSteps, setArrayOfSteps] = useState([])

    const [description, setDescription] = useState("")

    const addIngredientDataToArray = (ingredientData) => {
        setArrayOfIngredients(arrayOfIngredients => [...arrayOfIngredients, ingredientData])
        setIngredientData({name: '', quantity: ''})
    }

    const addStepDataToArray = (stepData) => {
        setArrayOfSteps(arrayOfSteps => [...arrayOfSteps, stepData])
        setStepData({text: ""})
    }

    
    if (isAddRecepiOpen) {
        return (
            <>
                <form action="">
                    <label htmlFor="">
                        <p>Recipe Title</p>
                        <input type="text" name="name"/>
                    </label>
                    <label htmlFor="">
                        <p>Ingredients</p>
                    {
                        arrayOfIngredients && arrayOfIngredients.map((ingredient) => {
                            return (
                                <>
                                    {ingredient.name}
                                    {ingredient.quantity}
                                </>
                            )
                        })
                    }    
                        <input type="text" name="ingredient_name" value={ingredientData.name} onChange={(e) => setIngredientData({...ingredientData, name: e.target.value})} />
                        <input type="text" name="ingredient_quantity" value={ingredientData.quantity} onChange={(e) => setIngredientData({...ingredientData, quantity: e.target.value})} />    
                    </label>
                    <button type="button" onClick={() => addIngredientDataToArray(ingredientData)}>Add ingredient</button>
                    <label htmlFor="">
                        <p>Steps</p>
                        {
                            arrayOfSteps && arrayOfSteps.map((step) => {
                                return (
                                    <>
                                        {step.number}
                                        {step.text}
                                    </>
                                )
                            })
                        }
                    <input type="text" name="steps" value={stepData.text} onChange={(e) => setStepData({...stepData, number: arrayOfSteps?.length + 1, text: e.target.value})}/>
                    <button type="button" onClick={() => addStepDataToArray(stepData)}>Add step</button>
                    </label>
                    <label htmlFor="">
                        <p>Description</p>
                        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </label>
                    <button type="submit">Add Recipe</button>
                </form>
            </>
        )
    }   
}