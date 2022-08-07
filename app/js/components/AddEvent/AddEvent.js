import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';

function AddEvent({
    show,
    onHide,
    slot,
}) {
    const [eventInput, setEventInput] = useState('')
    const handleCreate = () => {
        onHide(eventInput)
        setEventInput('')
    }
    return (
        <div className={`fade ${show ? 'show': ''}`}>
            <Modal.Dialog
                style={{
                    position: "absolute",
                    top: (slot.y - 152),
                    right: 195,
                    padding: "20px",
                    background: "white",
                    zIndex: 999,
                    width: 400,
                    borderRadius: "4px",
                    boxShadow: "1px 1px 4px 2px #0007"
                }}
            >
                <Modal.Header closeButton onHide={onHide}>
                    <Modal.Title>Add Event</Modal.Title>
                    <p className='mb-0 me-auto ms-3'>{moment(slot.start).format('h:mma')} - {moment(slot.end).format('h:mma')}</p>
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