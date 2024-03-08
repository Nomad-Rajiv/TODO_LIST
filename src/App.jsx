import { useEffect, useState } from "react"
import Navbar from "./Component/Navbar"

import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);


  // useRffect for saving todo
  useEffect(()=>{
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  },[])

 
  
  // for saving the todo list
  const saveTodoList = () =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleEdit = (e, id) =>{

    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id
    });
    setTodos(newTodos)
    saveTodoList()
    

  }

  const handleDelete = (e, id) =>{
    // console.log(`The id is ${id}`);

  let newTodos = todos.filter(item=>{
    return item.id !== id
  })
  
  setTodos(newTodos)
  saveTodoList()
  }

  const handleAdd = () =>{

    setTodos([...todos, {id: uuidv4(), todo, isComleted:false}])
    setTodo("");
    saveTodoList()
    
  }

  const handleChnage = (e) =>{
    setTodo(e.target.value)
  }

  const handleCheckbox =  (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
        return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isComleted = !newTodos[index].isComleted;
    setTodos(newTodos)
    saveTodoList()

  }
  

  return (
    <>
    <Navbar/>
    <div className="container  my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
      <div className="addTodo my-5">
       <h2 className="text-lg font-bold">Add a Todo</h2>
       
       <input  type="text" className="w-1/2" onChange={handleChnage} value={todo}/>
       <button className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 rounded-md mx-6 text-white" onClick={handleAdd}>Save</button>

       
      </div>
      <h2 className="text-lg font-bold">Your Todos</h2>
      <div className="todos">
        {todos.length === 0 && <div className="m-5">No Todos to Display</div>}
        {todos.map(items => {

        
           return <div key={items.id} className="todo flex w-1/3 my-3 justify-between">
            <div className="flex gap-5">

            <input onChange={handleCheckbox} type="checkbox" name={items.id} value={items.isComleted}/>

            <div className={items.isComleted?"line-through" : ""}>{items.todo}</div>

            </div>

            
          <div className="button flex h-full">
            <button onClick={(e)=>{handleEdit(e, items.id)}} className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 rounded-md mx-1 text-white">Edit</button>
            <button onClick={(e)=>{handleDelete(e, items.id)}} className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 rounded-md mx-1 text-white">Delete</button>
          </div>

        </div>
        })}
      </div>
    </div>
    </>
  )
}

export default App
