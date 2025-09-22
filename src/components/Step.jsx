import { useState } from "react"

export function Step( { number, text }) {

    const [checked, setChecked] = useState(false)
    return (
        <div className={checked ? "flex justify-normal gap-x-2 line-through" :"flex justify-normal gap-x-2"} onClick={() => setChecked(checked => !checked)}>
            <p>{number}</p>
            <p> {text}</p>
        </div>
    )
}