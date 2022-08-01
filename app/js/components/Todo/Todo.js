import React, { useState } from "react"

import './Todo.css'

const Todo = ({
    todoList,
    onAdd
}) => {
    const [showTodo, setShowTodo] = useState(!!todoList.length)
    const [newTodo, setNewTodo] = useState("")

    const handleKeyDown =(e) => {
        if (e.keyCode === 13) {
            onAdd(newTodo)
        }
    }

    return (
        <>
            {
                showTodo && (
                    <div className="todo-list-view">
                        <h3 className="todo-title">Today</h3>
                        {
                            todoList.map((todoItem, index) => (
                                <p className="todo-item" key={index}>{todoItem}</p>
                            ))
                        }
                        <input className="form-control todo-input" placeholder="New Todo" value={newTodo} onChange={(e) => {
                            setNewTodo(e.target.value)
                        }} onKeyDown={handleKeyDown} />
                    </div>
                )
            }
            <button className="btn-todo" onClick={() => setShowTodo(!showTodo)}>Todo</button>
        </>
    )
}

export default Todo