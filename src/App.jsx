import { useEffect, useState } from "react"
import Navbar from "./Component/Navbar"

import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);


  // useRffect for saving todo
  // useEffect(()=>{
  //   let todoString = localStorage.getItem("todos")
  //   if(todoString){
  //     let todos = JSON.parse(localStorage.getItem("todos"))
  //     setTodos(todos)
  //   }
  // },[])


  //fetch by chatgpt
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      console.log("Loaded todos from local storage:", storedTodos);
      setTodos(storedTodos);
    } else {
      console.log("No todos found in local storage.");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("Saved todos to local storage:", todos);
  }, [todos]);
 
  
  
 


  // const handleEdit = (e, id) =>{

  //   let t = todos.filter(i=>i.id === id)
  //   setTodo(t[0].todo)
  //   let newTodos = todos.filter(item=>{
  //     return item.id !== id
  //   });
  //   setTodos(newTodos)
  //   localStorage.setItem("todos", JSON.stringify(todos))
    
  // }


  // handle edit by chatgpt
  
  const handleEdit = (id) => {
    const editedTodo = todos.find(todo => todo.id === id);
    setTodo(editedTodo.todo);
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
    localStorage.setItem("todo", JSON.stringify(todo))
  }

//   const handleDelete = (e, id) =>{
//     // console.log(`The id is ${id}`);

//   let newTodos = todos.filter(item=>{
//     return item.id !== id
//   })
  
//   setTodos(newTodos)
//   localStorage.setItem("todos", JSON.stringify(todos))
// }

// handle delete by chatgpt

const handleDelete = (id) => {
  const filteredTodos = todos.filter(todo => todo.id !== id);
  setTodos(filteredTodos);
  localStorage.setItem("todo", JSON.stringify(todo))
}

  // const handleAdd = () =>{
  //   // console.log(...todos);
  //   setTodos([...todos, {id: uuidv4(), todo, isComleted:false}])
  
  //   setTodo("");
  //   localStorage.setItem("todo", JSON.stringify(todo))
  //   // console.log(todos);
  //   // console.log(todo);
  // }

  const handleChnage = (e) =>{
    setTodo(e.target.value)
  }

  // handle add by chatgpt
  const handleAdd = () => {
    if (todo.trim() !== "") {
      const newTodo = { id: uuidv4(), todo: todo, isCompleted: false };
      setTodos([...todos, newTodo]);
      setTodo("");
      localStorage.setItem("todo", JSON.stringify(todo))
    }
  }

  // const handleCheckbox =  (e) => {
  //   let id = e.target.name;
  //   let index = todos.findIndex(item => {
  //       return item.id === id;
  //   })
  //   let newTodos = [...todos];
  //   newTodos[index].isComleted = !newTodos[index].isComleted;
  //   setTodos(newTodos)
  //   localStorage.setItem("todos", JSON.stringify(todos))

  // }
  
  // handle checkbox by chatgpt
  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(todo))
  }
  

  return (
    <>
    <Navbar/>
    <div className="container  my-6 p-5 bg-[#49499C] min-h-[80vh]">
      <div className="addTodo my-5">
       <h2 className="text-lg font-bold text-white">Add a Todo</h2>
       
       <input  type="text" 
       className="w-1/2 rounded-md" 
       onChange={handleChnage} 
       value={todo} />

       <button className="bg-violet-800
        hover:bg-violet-950 
        p-2 text-sm font-bold py-1 rounded-md mx-6 text-white border " 
        onClick={handleAdd}>Save</button>

       
      </div>
      <h2 className="text-lg font-bold text-white">Your Todos</h2>
      <div className="todos text-white">
        {todos.length === 0 && <div className="m-5 text-white">No Todos to Display</div>}
        {todos.map(items => {

        
           return <div key={items.id} className="todo flex w-1/3 my-3 justify-between">
            <div className="flex gap-5">

            <input onChange={handleCheckbox} 
            type="checkbox" 
            name={items.id} 
            value={items.isComleted}/>

            <div className={items.isComleted?"line-through" : ""}>{items.todo}</div>

            </div>

            
          <div className="button flex h-full">
            <button onClick={()=>{handleEdit( items.id)}} className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 rounded-md mx-1 text-white border hover:border-none">Edit</button>
            <button onClick={()=>{handleDelete( items.id)}} className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 rounded-md mx-1 text-white border hover:border-none">Delete</button>
          </div>

        </div>
        })}
      </div>
    </div>
    </>
  )
}

export default App
