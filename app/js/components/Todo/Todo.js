import React, { useEffect, useState } from "react"

import Form from 'react-bootstrap/Form'
import { FiTrash2, FiChevronDown } from "react-icons/fi"
import { AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai'
import { MdDragIndicator } from 'react-icons/md'
import { DndProvider } from "react-dnd";
import {
  Tree,
  MultiBackend,
  getBackendOptions
} from "@minoru/react-dnd-treeview";

import './Todo.css'

const todoCategories = ["Today", "Done"];

const Todo = ({
    todoList,
    onAdd,
    onUpdate,
    onUpdateTodoDone,
    onDelete
}) => {
    const [todos, setTodos] = useState(todoList)
    const [showTodo, setShowTodo] = useState(true)
    const [newTodo, setNewTodo] = useState("")
    const [editingTodo, setEditTodo] = useState(null);
    const [todoCategory, setTodoCategory] = useState("Today")
    const [showDropdown, setShowDropdown] = useState(false);
    const handleDrop = (newTreeData) => {
        for (const newTree of newTreeData) {
            if (todoList.find(todo => todo.id === newTree.id && (newTree.parent || null) !== todo.parent_id)) {
                onUpdate({
                    id: newTree.id,
                    parent_id: (newTree.parent || null)
                })
            }
        }
        setTodos(newTreeData)
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            onAdd({
                name: newTodo,
                done: (todoCategory === 'Done')
            })
            setNewTodo('')
        }
    }

    const handleChange = (e, todo) => {
        onUpdateTodoDone({
            id: todo.id,
            done: e.target.checked
        })
    }

    const editTodo = (todo) => {
        setEditTodo(todo)
    }

    const deleteTodo = (todo) => {
        onDelete(todo)
    }

    const handleTodoChange = (e, node) => {
        onUpdate({
            id: node.id,
            name: e.target.value
        })
    }

    const handleTodoKeyDown = (e, node) => {
        if (e.shiftKey && e.keyCode == 9) {
            e.preventDefault();
            const parent_id = node.parent || null;
            if (!parent_id) {
                return
            }
            const parentItem = todoList.find((todoItem) => todoItem.id === parent_id)

            onUpdate({
                id: node.id,
                parent_id: parentItem.parent_id
            })
        } else if (e.keyCode === 9) {
            e.preventDefault();
            const parent_id = node.parent || null;
            let lastestSibling = null;
            for (const todoItem of todoList) {
                if (todoItem.id === node.id) {
                    break;
                }
                if (todoItem.parent_id === parent_id) {
                    lastestSibling = todoItem
                }
            }

            if (!lastestSibling) {
                return
            }

            onUpdate({
                id: node.id,
                parent_id: (lastestSibling.id || null)
            })
        } else if (e.keyCode === 13) {
            const parent_id = node.parent || null;
            onAdd({
                name: "",
                parent_id,
                priority: node.priority + 1,
                done: (todoCategory === 'Done')
            })
        }
    }

    const toggleDropDown = () => {
        setShowDropdown(!showDropdown)
    }

    const handleSelectCategory = (todoCategoryItem) => {
        setTodoCategory(todoCategoryItem)
        setShowDropdown(!showDropdown)
    }

    useEffect(() => {
        if (todoCategory === 'Done') {
            console.log(todoList.filter((todo) => todo.done))
            setTodos(todoList.filter((todo) => todo.done).map((todo) => {
                return {
                    ...todo,
                    parent: todo.parent_id || 0,
                    droppable: true
                }
            }))
        } else {
            setTodos(todoList.map((todo) => {
                return {
                    ...todo,
                    parent: todo.parent_id || 0,
                    droppable: true
                }
            }))
        }
        if (todoList && todoList.length > 0 && todoList[todoList.length - 1].new) {
            const todo = todoList[todoList.length - 1]
            setEditTodo({
                ...todo,
                parent: todo.parent_id || 0,
                droppable: true
            })
        }
    }, [todoList, todoCategory])

    return (
        <>
            <button className="btn-todo-mobile" onClick={() => setShowTodo(!showTodo)}>Todo</button>
            <div className={`todo-list-view ${showTodo ? "show": ""}`}>
                <div className="d-flex align-items-center mb-2 position-relative">
                    <h3 className="todo-title">{todoCategory}</h3>
                    <FiChevronDown color="white" size={22} className="ms-1" onClick={toggleDropDown} />
                    {
                        showDropdown && (
                            <div className="todo-category-selector">
                                {
                                    todoCategories.map((todoCategoryItem, index) => (
                                        <div key={index} onClick={() => handleSelectCategory(todoCategoryItem)}>{todoCategoryItem}</div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>

                <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                    <Tree
                        tree={todos}
                        rootId={0}
                        render={(node, { depth, isOpen, onToggle }) => {
                            return (
                                <div style={{ marginInlineStart: depth * 10 }}>

                                    <div className="todo-item-wrapper">
                                        {todos.filter(todo => todo.parent === node.id).length > 0 && (
                                            <div className="todo-item-expandable" onClick={onToggle}>{isOpen ? <AiFillCaretDown /> : <AiFillCaretRight />}</div>
                                        )}
                                        <MdDragIndicator />
                                        <Form.Check
                                            type="checkbox"
                                            id={`todo-${node.id}`}
                                            checked={node.done}
                                            className={`todo-item ${node.done ? 'done' : ''}`}
                                            onChange={(e) => handleChange(e, node)}
                                        />
                                        <input
                                            type="text"
                                            className={`me-auto todo-inline-input ${node.done ? 'text-decoration-line-through': ''}`}
                                            defaultValue={node.name}
                                            onChange={(e) => handleTodoChange(e, node)}
                                            onKeyDown={(e) => handleTodoKeyDown(e, node)}
                                            onFocus={() => editTodo(node)}
                                            autoFocus={editingTodo && node.id === editingTodo.id}
                                        />
                                        <FiTrash2 className="todo-item-edit" onClick={() => deleteTodo(node)} />
                                    </div>
                                </div>
                            )
                        }}
                        dragPreviewRender={(monitorProps) => (
                            <div className="todo-item-wrapper">
                                <MdDragIndicator />
                                {monitorProps.item.name}
                            </div>
                        )}
                        onDrop={handleDrop}
                        initialOpen={true}
                    />
                </DndProvider>
                <input className="form-control todo-input" placeholder="New Todo" value={newTodo} onChange={(e) => {
                    setNewTodo(e.target.value)
                }} onKeyDown={handleKeyDown} />
            </div>
            <button className="btn-todo" onClick={() => setShowTodo(!showTodo)}>Todo</button>
        </>
    )
}

export default Todo
