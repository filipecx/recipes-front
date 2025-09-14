export function RecipeComplete( {name, ingredients, steps, listId, description}) {
    return (
        <div>
            <h1>{name}</h1>
            <h2>Ingredients: </h2>
            {
                ingredients.map((ingredient) => {
                   return (
                    <div key={ingredient.id}>
                        <p>{ingredient.name}</p>
                        <p>{ingredient.quantity}</p>
                    </div>
                   )
                })
            
            }
            {
                steps.map((step) => {
                    return (
                        <div key={step.id}>
                            <p>{step.number}</p>
                            <p>{step.text}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}