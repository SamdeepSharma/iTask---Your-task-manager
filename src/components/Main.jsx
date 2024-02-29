/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const Main = () => {

     const [todo, settodo] = useState("")
     const [todos, settodos] = useState([])
     const [render, setrender] = useState(true)

     useEffect(() => {
       const fetchtodos= JSON.parse(localStorage.getItem("todos"))
       if(todos)
       settodos(todos)
     }, [])
     

     const addTodo = () => {
          settodos([...todos, { id: uuidv4(), content: todo, isCompleted: false }])
          settodo("")
          savetoLS()
     }

     const savetoLS = () =>{
          localStorage.setItem("todos", JSON.stringify(todos))
     }

     const editTodo = (item) => {
          settodo(item.content)
          let id = item.id
               const newTodos = todos.filter((todo) => {
                    return todo.id !== id
               })
          settodos(newTodos)
          savetoLS()
     }

     const deleteTodo = (item) => {
          var result = confirm("Do you want to delete this todo?");
          if (result) {
               let id = item.id
               const newTodos = todos.filter((todo) => {
                    return todo.id !== id
               })
               settodos(newTodos)
               savetoLS()
               alert('Todo Deleted!')
          }
     }

     const handleChange = (e) => {
          settodo(e.target.value)
     }

     const handleCheckbox = (item) => {
          item.isCompleted = !(item.isCompleted)
          savetoLS()
          setrender(!render)
     }


     return (
          <div className="bg-violet-200 mx-12 my-5 border rounded-xl min-h-[85vh] px-8 py-5">
               <div className="add-todo my-4">
                    <h1 className="font-bold">Add a todo</h1>
                    <input className="rounded-md min-w-[25vw] px-2 py-1 my-1 bg-slate-100" type="text" placeholder="Enter todo..." value={todo} onChange={handleChange} />
                    <button className="border-purple-950 bg-purple-600 hover:bg-purple-800 rounded-md mx-3 px-2 py-1 text-white font-medium" onClick={addTodo}>Save</button>
               </div>
               <div className="disp-todos">
                    <h1 className="font-bold">Your Todos</h1>
                    <div className="content overflow-auto h-[60vh] my-5 px-5 bg-purple-300 rounded-xl w-[70vw] scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent">
                    {todos.length == 0 && <div className="flex justify-center my-10">No todos to display...</div>}
                    {todos.map(item => {
                         return (
                              <div key={item.id} className="display my-5  flex gap-10">
                                   <div className="left flex gap-3 w-[50vw]">
                                        <input className="mr-3" type="checkbox" onClick={() => { handleCheckbox(item) }} />
                                        <div className={item.isCompleted ? "line-through" : ""}>{item.content}</div>
                                   </div>
                                   <div className="right flex items-center">
                                        <button className="border-purple-950 bg-purple-600 hover:bg-purple-800 rounded-md mx-3 px-2 py-1 text-white font-medium" onClick={()=>{editTodo(item)}}>Edit</button>
                                        <button className="border-purple-950 bg-purple-600 hover:bg-purple-800 rounded-md mx-3 px-2 py-1 text-white font-medium" onClick={() => { deleteTodo(item) }}>Delete</button>
                                   </div>
                              </div>
                         )
                    })}
                    </div>
               </div>
          </div>
     )
}

export default Main
