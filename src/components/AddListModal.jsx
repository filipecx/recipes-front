import { Input } from "postcss";

export function AddListModal({isOpen}) {
    if (isOpen) {
        return (
            <div className="ListModal">
                <p>Add a new list</p>
                <form>
                    <label htmlFor="">
                        List name 
                    <input type="text" />
                    </label>

                    <label htmlFor="">
                        List description 
                    <input type="text" />
                    </label>

                    <button type="submit">Add list</button>
                </form>
            </div>
        )
    }
}