export function FormInput({input_name, input_value, setIngredientData, ingredientData}) {
    return (
        <input 
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
            type="text" 
            name="ingredient_name" 
            value={ingredientData.name} 
            
            onChange={(e) => setIngredientData({...ingredientData, name: e.target.value})} 
            
            />
    )
}