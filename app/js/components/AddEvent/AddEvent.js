import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddEvent({
    show,
    onHide,
    x,
    y
}) {
    const [eventInput, setEventInput] = useState('')
    const handleCreate = () => {
        onHide(eventInput)
        setEventInput('')
    }
    return (
        <div className={`fade ${show ? 'show': ''}`}>
            <Modal.Dialog style={{
                position: "absolute",
                top: (y - 152),
                left: (x - 248),
                padding: "20px",
                background: "white",
                zIndex: 999,
                borderRadius: "4px",
                boxShadow: "1px 1px 4px 2px #0007"
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input
                        type="input"
                        className='form-control event-input'
                        onChange={(e) => setEventInput(e.target.value)}
                        value={eventInput}
                        placeholder="Enter event"
                    />
                </Modal.Body>

                <Modal.Footer className='mt-2'>
                    <Button variant="primary" onClick={handleCreate}>Create</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

export default AddEvent;