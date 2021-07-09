import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList/TodoList';
import Http from './utils/Http';
import './App.css';

function App() {

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  // const url = 'https://jsonplaceholder.typicode.com/todos';
 
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
  
      const response = await Http.get('/todos');
      setTodos(response.data.slice(0, 5));
      
      setLoading(false);

      // const response = await fetch(
      //   "https://jsonplaceholder.typicode.com/todos"
      // );
      // const result = await response.json();      
    }
  
    fetchData();
  }, []);

  const addNewTodo = async e => {
    e.preventDefault();
    if(!name){
      alert('Please enter a todo.');
      return;
    }

    const newTodo = {
      userId: 2,
      id: new Date().getTime().toString(),
      title: name,
      completed: [false, true][Math.floor(Math.random()*2)]
    };
    
    setSaving(true);

    try {
      const response = await Http.post('/todos', { newTodo });
      console.log(response);

      setSaving(false);
      setTodos([
        ...todos,
        { ...response.data.newTodo, id: newTodo.id},
      ]);
    } catch(e) {
      setSaving(false);
      setError(e?.message);
    }

    // fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify(newTodo),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     setSaving(false);
    //     setTodos(todos.concat({...result, id: newTodo.id}));
    //   })    
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
 
  return (
    <div className="App">
      <h1 className="header">My todo list</h1>
     
      <div className='add-todo-form'>
        {
          saving ? 
          <div>Saving...</div>
          :(
            <div>
              {error && <div>{error}</div>}
              <form onSubmit={addNewTodo}>
                <label htmlFor="todoTitle">Title:</label>
                <input 
                  type='text' 
                  id='todoTitle'
                  onChange={e => setName(e.target.value)}
                  placeholder='enter todo here...'
                />

                <button
                  type='submit'
                  data-testid='addNewTodoButton'
                >
                  Add new todo
                </button>
              </form>
            </div>
          )
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
