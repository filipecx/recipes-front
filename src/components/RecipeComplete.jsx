
export function RecipeComplete( {name, ingredients, steps, listId, description}) {
    return (
        <div className="w-full max-w-md mx-auto my-4 p-4 cursor-pointer flex flex-col shadow-lg rounded-xl" >
            <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
            <div className="flex justify-end flex-col">
                <h2>Ingredients: </h2>
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
            
            {
                steps.map((step) => {
                    return (
                        <div className="flex justify-normal" key={step.id}>
                            <p >{step.number}</p>
                            <p className="px-2">{step.text}</p>
                        </div>
                    )
                })
            }
            <p>{description.text}</p>
            <p>{description.makes}</p>
            <p>{description.time}</p>
            
        </div>
    )
}