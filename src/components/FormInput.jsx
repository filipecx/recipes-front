export function FormInput({input_name, input_value, setRecipeData, recipeData, property}) {
    return (
        <input 
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
            type="text" 
            name={input_name} 
            value={input_value}           
            onChange={(e) => setRecipeData({...recipeData, [property]: e.target.value})}           
            />
    )
}