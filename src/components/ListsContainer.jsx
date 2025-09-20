import { useEffect, useState } from "react";
import { ListCard } from "./ListCard";
import { RecipeCard } from "./RecipeCard";
import { Link } from "react-router";
import { AddListModal } from "./AddListModal";
import { AddRecipeModal } from "./AddRecipeModal";
import Axios from "axios";


export function ListsContainer() {
  const [lists, setLists] = useState([])
  const [expandedListId, setExpandedListId] = useState(null)
  const [isAddListOpen, setAddListOpen] = useState(false)

  //make a get here. Shoud i get the lists and the recipes names in the same request?
  const data = {title: "Base List", description: "" }
  const fetchLists = async () => {
    try {
      const response = await Axios.get(`http://localhost:8080/recipeslist`)
      setLists(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  const removeList = async (listId) => {
  const oldData = [...lists]
  const newArray = lists.filter((list) => list.id != listId)
  setLists(newArray)

  try {
    const response = await Axios.delete(`http://localhost:8080/recipeslist/${listId}`, {withCredentials: true})
  } catch(e) {
      console.error("Failed to delete list", error)
      setLists(oldData)
    }
  }

  useEffect(() => {
    setLists(lists => [...lists, data])
    fetchLists()
  }, [])

  return (
    <div className="w-full max-w-md mx-auto my-4 p-4 cursor-pointer">
      <div className="flex-col justify-start">
        {
          lists.map((list) => {
            return (        
              <div>
                  <ListCard 
                  title={list.name} 
                  description={list.description} 
                  listId={list.id} key={list.id}
                  removeList={removeList} 
                  isExpanded={expandedListId === list.id}/>                
              </div>
          )
          })
        }
        <div onClick={() => setAddListOpen(!isAddListOpen)}>
          
          { isAddListOpen ? <p>xxxxxxxxxxxxxX</p> : <button type="button" className="w-full bg-green-200 text-white py-2 rounded-lg hover:bg-green-600">Add List</button>}
        </div>
        <AddListModal isOpen={isAddListOpen}/>
        
      </div>
    </div>
  );
}
