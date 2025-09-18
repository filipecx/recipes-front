import { RecipeComplete } from './RecipeComplete';

export function EditListModal ({ name, ingredients, steps, description, listId}) {
    return (
        <form onSubmit={sendChanges}>
                    <label htmlFor="">
                        <p>Recipe Title</p>
                        <input type="text" name="name" value={recipeForm.name} onChange={(e) => setRecipeForm({...recipeForm, name: e.target.value})}/>
                    </label>
                    <label htmlFor="">
                        <p>Ingredients</p>
                    {
                        arrayOfIngredients && arrayOfIngredients.map((ingredient, index) => {
                            return (
                                <div key={index}>
                                    <label name="ingredient_name">Ingredient</label>
                                    <input type="text" value={ingredient.name} name='name' onChange={(e) => handleChange(e, index, arrayOfIngredients)}/>
                                    <label name="ingredient_quantity">Quantity</label>
                                    <input type="text" value={ingredient.quantity} name='quantity' onChange={(e) => handleChange(e, index, arrayOfIngredients)} />
                                    <button type="button" onClick={() => removeField(index)}>Remove field</button>        
                                </div>
                            )
                        })
                    }
                    <button type="button" onClick={addIngredientInput}>Add another ingredient</button> 
                    </label> 
                    
                        
                    <label htmlFor="">
                        <p>Steps</p>
                    </label>
                        {
                            arrayOfSteps && arrayOfSteps.map((step, index) => {
                                return (
                                    <div key={index}>
                                        <label name="text"></label>
                                        <input type="text" value={step.text} name="text" onChange={(e) => handleChange(e, index, arrayOfSteps)}/>                                     
                                    </div>
                                )
                            })
                        }
                        <button type="button" onClick={addStepInput}>Add step</button>
                        <button type="button" onClick={removeLastStep}>Remove last step</button>
                       
                   
                    <label htmlFor="">Description</label>
                    {/* changin state of nested object */}
                    <input type="text" name="text" value={recipeForm.description.text} onChange={(e) => setRecipeForm({...recipeForm, description: {...recipeForm.description, text: e.target.value}})}/>
                    <label htmlFor="">Servings</label>
                    <input type="text" name="makes" value={recipeForm.description.makes} onChange={(e) => setRecipeForm({...recipeForm, description: {...recipeForm.description, makes: e.target.value}})}/>
                    <label htmlFor="">Total time</label>
                    <input type="text" name="time" value={recipeForm.description.time} onChange={(e) => setRecipeForm({...recipeForm, description: {...recipeForm.description, time: e.target.value}})}/>
                    
                    <button type="submit">Edit Recipe</button>
                </form>
    )
}