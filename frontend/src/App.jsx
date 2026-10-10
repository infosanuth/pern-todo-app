import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {MdOutlineDone} from 'react-icons/md'

const App = () => {

  const [description, setDescription] = useState("")
  const [todos, setTodos] = useState([])
  const [editTodos, setEditTodos] = useState(null);
  const [editText, setEditTest] = useState("")

  const onsubmitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/todos", {
        description,
        completed: false
      })
      setDescription("")
      getTodos();
    } catch (err) {
      console.log(err.message)
    }
  }

  const getTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todos");
      setTodos(res.data);
      console.log(res.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className='min-h-screen bg-gray-800 p-4 flex justify-center items-center'>
      <div className='bg-gray-50 rounded-2xl w-full max-w-lg p-8'>
        <h1 className='text-4xl text-bold font-bold mb-8 justify-self-center'>PERN TODO APP</h1>
        <form onSubmit={onsubmitForm} className='flex items-center gap-2 border p-2 rounded-lg mb-6'>
          <input className='flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400' type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='What needs to be done?' required />
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md font-medium cursor-pointer'>Add Task</button>
        </form>
        <div>
          {todos.length === 0 ? (
            <p className='text-gray-600'>No Tasks available. Add a new task!</p>
          ) : (
            <div className='flex flex-col'>
              {todos.map((todos) => (
                <div className='flex gap-2 py-1'>
                  <button className={`h-6 w-6 border-2 rounded-full flex items-center justify-center ${todos.completed 
                    ? "bg-green-500 border-green-500 text-white" 
                    : "border-gray-300 hover:border-blue-400"
                    }`}>
                      {todos.completed && <MdOutlineDone size={16}/>}
                    </button>
                  <span>{todos.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

  )
}

export default App
