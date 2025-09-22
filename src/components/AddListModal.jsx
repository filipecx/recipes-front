import { Input } from "postcss";
import Axios from "axios";
import { useState } from "react";

export function AddListModal({isOpen}) {


    const [listName, setListName] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            await Axios.post("http://localhost:8080/recipeslist", {name: listName}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            //setFormData({name: ""})
        } catch (error) {
           if (error.response) {
    console.error("Backend returned:", error.response.status, error.response.data);
  } else {
    console.error("Request error:", error.message);
  }
        }
    }
    if (isOpen) {
        return (
            <div className="flex h-screen bg-secondary justify-center ">
                <form className="w-4/5 max-w-md space-y-6" onSubmit={handleSubmit}>
                    <label htmlFor="">
                        List name 
                    <input
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
                    type="text"  onChange={(e) => setListName(e.target.value)}/>
                    </label>

                    <button
                    className="my-2 w-full bg-green-200 text-white py-2 rounded-lg hover:bg-green-600"
                    type="submit">Add list</button>
                </form>
            </div>
        )
    }
}