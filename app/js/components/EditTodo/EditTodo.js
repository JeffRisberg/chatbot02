import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './EditTodo.css';

function EditTodo({
    show,
    onHide,
    onDelete,
    todo,
}) {
    const [todoInput, setTodoInput] = useState('')
    const handleEdit = () => {
        onHide(todoInput)
        setTodoInput('')
    }

    const handleDelete = () => {
        onDelete()
    }

    useEffect(() => {
        if (todo) {
            setTodoInput(todo.name)
        }
    }, [todo])
    return (
        <div className={`fade ${show ? 'show': 'd-none'}`}>
            <Modal.Dialog
                className='edit-todo-modal'
            >
                <Modal.Header closeButton onHide={onHide}>
                    <Modal.Title>Edit todo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input
                        type="input"
                        className='form-control event-input'
                        onChange={(e) => setTodoInput(e.target.value)}
                        value={todoInput}
                        placeholder="Enter todo"
                    />
                </Modal.Body>

                <Modal.Footer className='mt-2'>
                    <Button variant="primary" onClick={handleEdit}>Edit</Button>
                    <Button variant="danger" className='ms-2' onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

export default EditTodo;
