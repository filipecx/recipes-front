import { useState } from "react"
import { Ingredient } from "./Ingredient"
import { Step } from "./Step"

export function RecipeComplete( {name, ingredients, steps, listId, description}) {
    const [checked, setChecked] = useState([])
    return (
        <div className="flex flex-col gap-y-6">
            <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
            <div className="flex flex-col">
                <div className="flex">
                    <p className="font-semibold text-lg">Description: </p>
                </div>
                <div className="flex content-start">
                    <p>{description.text}</p>
                </div>
                <div className="flex">
                    <p>Makes: {description.makes}</p>
                </div>
                <div className="flex">
                    <p>Takes: {description.time}</p>
                </div>
            </div>
            
            <div className="flex flex-col">
                <div className="flex">
                    <p className="font-semibold text-lg">Ingredients: </p>
                </div>
                
                {
                    ingredients.map((ingredient) => {
                    return (
                        <Ingredient name={ingredient.name} quantity={ingredient.quantity} id={ingredient.id}/>
                    )
                    })
                
                }
            </div>

            
            <div>
                <div className="flex">
                    <p className="font-semibold text-lg">Steps:</p>
                </div>
                {
                    steps.map((step) => {
                        return (
                            <Step number={step.number} text={step.text} key={step.id}/>
                        )
                    })
                }
            </div>
            
            
        </div>
    )
}