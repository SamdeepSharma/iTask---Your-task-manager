/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { MdDelete} from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const Main = () => {

     const [todo, settodo] = useState("")
     const [todos, settodos] = useState([])
     const [show, setshow] = useState(true)

     useEffect(() => {
       let fetchtodos= JSON.parse(localStorage.getItem("todos"))
       if(fetchtodos)
       settodos(fetchtodos)
     }, [])

     const savetoLS = (todos) =>{
          localStorage.setItem("todos", JSON.stringify(todos))
     }

     const addTodo = () => {
          const newtodos= ([...todos, { id: uuidv4(), content: todo, isCompleted: false }])
          settodos(newtodos)
          settodo("")
          savetoLS(newtodos)
     }

     const editTodo = (item) => {
          settodo(item.content)
          let id = item.id
               const newTodos = todos.filter((todo) => {
                    return todo.id !== id
               })
          settodos(newTodos)
          savetoLS(newTodos)
     }

     const deleteTodo = (item) => {
          var result = confirm("Do you want to delete this todo?");
          if (result) {
               let id = item.id
               const newTodos = todos.filter((todo) => {
                    return todo.id !== id
               })
               settodos(newTodos)
               savetoLS(newTodos)
               alert('Todo Deleted!')
          }
     }

     const handleChange = (e) => {
          settodo(e.target.value)
     }

     const handleCheckbox = (item) => {
          item.isCompleted == !(item.isCompleted)
          const updatedTodos = todos.map((todo) => {
               if (todo.id === item.id) {
                    return { ...todo, isCompleted: !todo.isCompleted };
                }
                return todo;
           });
           settodos(updatedTodos);
           savetoLS(updatedTodos);
     }

     const showcompleted = () =>
     {
          setshow(!show)
     }


     return (
          <div className="bg-violet-200 md:mx-12 my-5 border rounded-xl min-h-[75vh] mx-3 md:px-8 px-5 py-5">
               <h1 className="md:text-2xl text-xl font-bold flex justify-center items-center gap-3"><GrNotes/> iTask - One place for all your notes</h1>
               <div className="add-todo my-4">
                    <h1 className="font-bold text-lg">Add a todo</h1>
                    <div className="flex gap-3">
                    <input className="rounded-md min-w-[25vw] px-2 py-1 my-1 bg-slate-100" type="text" placeholder="Enter a todo..." value={todo} onChange={handleChange} />
                    <button disabled={todo.length<3} className="border-purple-950 bg-purple-700 hover:bg-purple-900 rounded-md mx-3 px-2 py-1 text-white font-medium disabled:bg-purple-950 flex items-center gap-2" onClick={addTodo}>Save<FaRegSave /></button>
               </div>
               </div>
               <div className="disp-todos">
                    <h1 className="font-bold text-lg">Your Todos</h1>
                    <div className="my-2 mx-2 flex gap-3">
                         <input type="checkbox" name="display" checked={show} onClick={showcompleted}/> <span className="text-md">Show completed todos</span>
                    </div>
                    <div className="content overflow-auto h-[50vh] my-5 px-5 bg-purple-300 rounded-xl md:w-[70vw] w-[80vw] scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent">
                    {todos.length == 0 && <div className="flex justify-center my-10">No todos to display...</div>}
                    {todos.map(item => {
                         return ( (show || !item.isCompleted) &&
                              <div key={item.id} className="display my-5  flex gap-10">
                                   <div className="left flex gap-3 w-[50vw]">
                                        <input className="mr-3" checked={item.isCompleted} type="checkbox" onClick={() => { handleCheckbox(item) }} />
                                        <div className={item.isCompleted ? "line-through" : ""}>{item.content}</div>
                                   </div>
                                   <div className="right flex items-center">
                                        <button className="border-purple-950 bg-purple-700 hover:bg-purple-900 rounded-md mx-3 px-2 py-1 text-white font-medium" onClick={()=>{editTodo(item)}}><FaEdit /></button>
                                        <button className="border-purple-950 bg-purple-700 hover:bg-purple-900 rounded-md mx-3 px-2 py-1 text-white font-medium" onClick={() => { deleteTodo(item) }}><MdDelete /></button>
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
