import React from 'react';
import ListItem from '../ListItem/ListItem';

export default function TodoList({todos, updateTodos, deleteTodo}) {
    return (
        <div className='todo-list'>
            <ol>
                {
                    todos.map((todo,index)=>{
                        const{id} = todo;
                        return (                            
                            <li key={id}>
                                 <ListItem 
                                    todo={todo} 
                                    updateTodos={updateTodos} 
                                    deleteTodo={deleteTodo}                            
                                    />
                            </li>                           
                        )
                    })
                }
            </ol>    
        </div>
    )
};
