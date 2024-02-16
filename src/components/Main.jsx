import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const Main = () => {

     const [todo, settodo] = useState("")
     const [todos, settodos] = useState([])
     
     const addTodo = () =>{
          settodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
          settodo("")
     }

     const editTodo = () =>{

     }

     const deleteTodo = () =>{

     }

     const handleChange = (e) =>{
          settodo(e.target.value)
     }

     const handleCheckbox = (e) =>{
          settodo(e.target.value)
     }

  return (
    <div className="bg-violet-200 mx-12 my-5 border rounded-xl min-h-[85vh] px-8 py-5">
     <div className="add-todo my-4">
     <h1 className="font-bold">Add a todo</h1>
     <input className="rounded-md min-w-[25vw] px-2 py-1 my-1 bg-slate-100" type="text" placeholder="Enter todo..." value={todo} onChange={handleChange} />
     <button className="border-purple-950 bg-purple-600 hover:bg-purple-800 rounded-md mx-3 px-2 py-1 text-white font-medium" onClick={addTodo}>ADD</button>
     </div>
     <div className="disp-todos">
     <h1 className="font-bold">Your Todos</h1>
     {todos.map(item =>{
          return(
     
     <div key={item.id} className="display my-5  flex justify-between max-w-[50vw]">
     <div className="left flex">
     <input className="mr-3" type="checkbox" onClick={handleCheckbox} />
     <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
     </div>
     <div className="right">
     <button className="border-purple-950 bg-purple-600 hover:bg-purple-800 rounded-md mx-3 px-2 py-1 text-white font-medium" onClick={editTodo}>Edit</button>
     <button className="border-purple-950 bg-purple-600 hover:bg-purple-800 rounded-md mx-3 px-2 py-1 text-white font-medium" onClick={deleteTodo}>Delete</button>
     </div>
     </div>
     )})}
     </div>
    </div>
  )
}

export default Main
