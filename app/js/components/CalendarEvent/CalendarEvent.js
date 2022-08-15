import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { Overlay } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';

import {updateEvent, deleteEvent} from '../../actions/events';

function CalendarEvent(props) {
    const {event} = props
    const [eventInput, setEventInput] = useState(event.title)

    useEffect(() => {
        setEventInput(event.title)
    }, [event])
    const [show, setShow] = useState(false)
    const target = useRef(null);
    const host = '';
    const handleEdit = async () => {
        const payload = {
            id: event.id,
            title: eventInput
        }
        const res = await axios.patch(host + '/api/events', payload)
        if (res.status === 200) {
            props.updateEvent({
                ...event,
                title: eventInput
            })
        }
        setShow(false)
    }

    const handleDelete = async () => {
        const res = await axios.delete(host + '/api/event/' + event.id)
        if (res.status === 200) {
            props.deleteEvent({
                ...event,
            })
        }
        setShow(false)
    }

    return (
        <>
            <div ref={target} onClick={() => setShow(!show)}>
                {event.title}
            </div>
            <Overlay target={target.current} show={show} placement="left">
                {({  ...props }) => (
                    <div
                        {...props}
                        style={{
                            position: 'absolute',
                            zIndex: 999,
                            ...props.style,
                        }}
                    >
                        <Modal.Dialog style={{
                            padding: "20px",
                            background: "white",
                            borderRadius: "4px",
                            width: 400,
                            boxShadow: "1px 1px 4px 2px #0007"
                        }}>
                            <Modal.Header closeButton onHide={() => setShow(false)}>
                                <Modal.Title>Edit Event</Modal.Title>
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
                                <Button variant="primary" onClick={handleEdit}>Edit</Button>
                                <Button variant="danger" className='ms-2' onClick={handleDelete}>Delete</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                )}
            </Overlay>
        </>
    );
}


const mapStateToProps = () => ({
});

export default connect(
    mapStateToProps,
    { updateEvent, deleteEvent }
)(CalendarEvent);
