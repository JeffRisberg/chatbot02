import React, { useState } from "react"

import Form from 'react-bootstrap/Form'
import { FiEdit } from "react-icons/fi"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditTodo from "../EditTodo/EditTodo";

import './Todo.css'


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    for (let i = 1; i <= result.length; i ++) {
        result[i - 1].priority = i
    }

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // change background colour if dragging
    background: isDragging ? "#0009" : "transparent",
    padding: isDragging ? "0px 8px" : "0px",

    // styles we need to apply on draggables
    ...draggableStyle
});

const Todo = ({
    todoList,
    onAdd,
    onUpdate,
    onUpdatePriorities,
    onDelete
}) => {
    const [showTodo, setShowTodo] = useState(!!todoList.length)
    const [newTodo, setNewTodo] = useState("")
    const [editingTodo, setEditTodo] = useState(null);

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            onAdd(newTodo)
            setNewTodo('')
        }
    }

    const handleChange = (e, todo) => {
        onUpdate({
            id: todo.id,
            done: e.target.checked
        })
    }

    const editTodo = (e, todo) => {
        console.log(e, todo)
        setEditTodo(todo)
    }

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            todoList,
            result.source.index,
            result.destination.index
        );

        onUpdatePriorities(items)
    }

    const hideEdit = (edit) => {
        if (edit) {
            onUpdate({
                id: editingTodo.id,
                name: edit
            })
        }
        setEditTodo(null)
    }

    const deleteTodo = () => {
        onDelete(editingTodo)
        setEditTodo(null)
    }

    return (
        <>
            {
                showTodo && (
                    <div className="todo-list-view">
                        <h3 className="todo-title">Today</h3>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {
                                            todoList.map((todoItem, index) => (
                                                <Draggable key={todoItem.id} draggableId={`item-${todoItem.id}`} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            <div className="todo-item-wrapper">
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    id={`todo-${todoItem.id}`}
                                                                    label={todoItem.name}
                                                                    checked={todoItem.done}
                                                                    className={`todo-item ${todoItem.done ? 'done' : ''}`}
                                                                    onChange={(e) => handleChange(e, todoItem)}
                                                                />
                                                                <FiEdit className="todo-item-edit" onClick={(e) => editTodo(e, todoItem)} />
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <input className="form-control todo-input" placeholder="New Todo" value={newTodo} onChange={(e) => {
                            setNewTodo(e.target.value)
                        }} onKeyDown={handleKeyDown} />
                    </div>
                )
            }
            <button className="btn-todo" onClick={() => setShowTodo(!showTodo)}>Todo</button>
            <EditTodo
                show = {!!editingTodo}
                onHide = {hideEdit}
                onDelete = {deleteTodo}
                todo = {editingTodo}
            />
        </>
    )
}

export default Todo