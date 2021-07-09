import React from 'react';
import styles from './ListItem.module.css';

export default function ListItem({todo, deleteTodo, updateTodos}) {
    const {title, completed, id} = todo;
    return (
        <div className='list-item'>           
            <div className='item-title'>
                <input 
                    type='checkbox' 
                    checked={completed}
                    data-testid={`checkbox-${id}`}
                    name={`checkbox-${id}`} 
                    onChange={()=> updateTodos(id)}
                />
                <label 
                    htmlFor={`checkbox-${id}`}
                    data-testid={`labelOfCheckbox-${id}`}
                    onClick={()=> updateTodos(id)}
                    className={`${completed? styles.completed:''}`}
                    >
                        {title}
                </label> 
            </div>
            <button 
                className={styles.closeBtn}
                data-testid={`closeBtn-${id}`}
                onClick = {()=>deleteTodo(id)}
            >
                X
            </button>
        </div>
    )
}
