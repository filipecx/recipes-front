import { useEffect, useState } from "react";
import { ListCard } from "./ListCard";
import { RecipeCard } from "./RecipeCard";
import { Link } from "react-router";
import { AddListModal } from "./AddListModal";
import { AddRecipeModal } from "./AddRecipeModal";
import Axios from "axios";
import { FaRegWindowClose } from "react-icons/fa";


export function ListsContainer() {
  const [lists, setLists] = useState([])
  const [expandedListId, setExpandedListId] = useState(null)
  const [isAddListOpen, setAddListOpen] = useState(false)
  

  
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

  const editList = async (e, listId, newListName) => {
    e.preventDefault()

    const newList = {
      name: newListName,
      id: listId,
      userId: lists[0].userId
    }

    setLists(lists.map(list => {
      if (listId === list.id) {
        return newList;
      } else {
        return list;
      }
    }));
    
    
    try {
      const response = await Axios.put(`http://localhost:8080/recipeslist/${listId}`, 
        {
          name: newListName
        },
        {
          withCredentials: true 
        }
      )

    } catch (error) {
      console.error("Could not update list", error)
    }
  }

  useEffect(() => {
    {/*setLists(lists => [...lists, data])*/}
    fetchLists()
  }, [])

  return (
    <div className="w-full max-w-md mx-auto my-4 p-4">
      <div className="flex flex-col gap-y-6">
        {
          lists.map((list) => {
            return (        
              <div>
                  <ListCard 
                  title={list.name} 
                  description={list.description} 
                  listId={list.id} 
                  key={list.id}
                  removeList={removeList} 
                  isExpanded={expandedListId === list.id}
                  lists={lists}
                  setLists={setLists}
                  editList={editList} 
                  />           
              </div>
          )
          })
        }
        <div onClick={() => setAddListOpen(!isAddListOpen)} className="bg-black flex justify-center text-white p-4 rounded-lg"
        >
          
          { isAddListOpen ? 
          <button type="button" className="flex text-3xl cursor-pointer"><FaRegWindowClose /></button> 
          : <button type="button" className="my-4 cursor-pointer w-full bg-black text-white py-2 rounded-lg font-semibold">Add List</button>}
        </div>
        <AddListModal isOpen={isAddListOpen}/>
        
      </div>
    </div>
  );
}
