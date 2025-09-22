import { useState } from "react"

export function Ingredient({ name, quantity, id}) {

    const [checked, setchecked] = useState(false)
    return (
        <div className={checked? "flex justify-between line-through":"flex justify-between"} onClick={() => setchecked(checked => !checked)}>
                            <p>{name}</p>
                            <p>{quantity}</p>
                        </div>
    )
}