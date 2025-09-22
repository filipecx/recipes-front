
export function RecipeComplete( {name, ingredients, steps, listId, description}) {
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
                        <div className="flex justify-between" key={ingredient.id}>
                            <p>{ingredient.name}</p>
                            <p>{ingredient.quantity}</p>
                        </div>
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
                            <div className="flex justify-normal gap-x-2" key={step.id}>
                                <p>{step.number}</p>
                                <p> {step.text}</p>
                            </div>
                        )
                    })
                }
            </div>
            
            
        </div>
    )
}