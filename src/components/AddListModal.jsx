import { Input } from "postcss";
import Axios from "axios";
import { useState } from "react";

export function AddListModal({isOpen}) {

    const [formData, setFormData] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            await Axios.post("http://localhost:8080/recipeslist", {"name": "Insominia"}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            //setFormData({name: ""})
        }catch (error) {
           if (error.response) {
    console.error("Backend returned:", error.response.status, error.response.data);
  } else {
    console.error("Request error:", error.message);
  }
        }
    }
    if (isOpen) {
        return (
            <div className="ListModal">
                <p>Add a new list</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">
                        List name 
                    <input type="text"  onChange={(e) => setFormData(e.target.value)}/>
                    </label>

                    <button type="submit">Add list</button>
                </form>
            </div>
        )
    }
}