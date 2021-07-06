import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList/TodoList';
import './App.css';

function App() {

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const url = 'https://jsonplaceholder.typicode.com/todos';
  

  const addNewTodo = e =>{
    e.preventDefault();
    const newTodo = {
    userId:2,
    id:new Date().getTime().toString(),
    title:name,
    completed:[false, true][Math.floor(Math.random()*2)]
  };
    
    setSaving(true);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setSaving(false);
        if(!name){
      alert('please enter a todo.');
    } else {
      setTodos(todos.concat({...result, id: newTodo.id}));
    };         
      })    
  };


  const updateTodos = id =>{
    const todoLists = todos.map((todo)=>{
      if(todo.id === id) {
        const updatedTodo = {...todo, completed: !todo.completed };
        return updatedTodo;
      }
      return todo;
    });
    setTodos(todoLists);
  }

  const deleteTodo = id =>{
    const todosTobeKept = todos.filter(todo => todo.id !== id);
    setTodos(todosTobeKept);
  };
 

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      ).then((response) => response.json());
      setLoading(false);
      setTodos(result.slice(0, 5));
    }
    fetchData();
  }, []);
console.log('todos',todos);

  return (
    <div className="App">
      <h1 className="header">My todo list</h1>
     
      <div className='add-todo-form'>
        {
          saving ? 
          <div>Saving...</div>
          :(<form onSubmit={addNewTodo}>
          <label htmlFor="todo-title">Title:</label>
          <input 
          type='text' 
          onChange={e=>setName(e.target.value)}
            placeholder='enter todo here...'
          />
          <button type='submit'>Add new todo</button>
        </form>)
        }
      </div>
         { 
       loading? 
        <h2>Loading...</h2>: <TodoList todos={todos} deleteTodo={deleteTodo} updateTodos={updateTodos}/>
        }          
    </div>
  );
}

export default App;
