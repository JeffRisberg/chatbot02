import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {connect} from 'react-redux';
import axios from 'axios';
import TimezoneSelect from 'react-timezone-select';
import AvatarInput from '../AvatarInput/AvatarInput';

import {set_user} from '../../actions/user';

import './ProfileModal.css';

const imageList = [
    "/images/bg-1.jpg",
    "/images/bg-2.jpg",
    "/images/bg-3.jpg",
    "/images/bg-4.jpg",
    "/images/bg-5.jpg",
    "/images/bg-6.jpg"
]

const ProfileModal = (props) => {
    const { show, onHide } = props
    const [user, setUser] = useState({})
    const [avatarFile, setAavatarFile] = useState();

    useEffect(() => {
        if (props.user) {
            setUser(props.user)
        }
    }, [props.user])

    const handleChange = (e) => {
        const name = e.target.name
        setUser({
            ...user,
            [name]: e.target.value
        })
    }

    const handleBackgroundChange = (id) => {
        setUser({
            ...user,
            background: id
        })
    }

    const setSelectedTimezone = (timezone) => {
        setUser({
            ...user,
            timezone: timezone.value
        })
    }

    const handleSubmit = async () => {
        const formData = new FormData()
        if (user.first_name) {
            formData.append("first_name", user.first_name)
        }
        if (user.last_name) {
            formData.append("last_name", user.last_name)
        }
        if (user.timezone) {
            formData.append("timezone", user.timezone)
        }
        if (user.background) {
            formData.append("background", user.background)
        }
        if (avatarFile) {
            formData.append("avatar", avatarFile)
        }

        const response = await axios.post('/api/profile', formData)
        if (response.status === 200) {
            setUser(response.data[0])
            props.set_user(response.data[0])
            onHide()
        }
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Profile</Modal.Title>
            </Modal.Header>
            <Form encType='multipart/form-data' method='post' action='/api/profile'>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="first_name">First Name</Form.Label>
                                <Form.Control id="first_name" name="first_name" placeholder="First Name" value={user.first_name} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="last_name">Last Name</Form.Label>
                                <Form.Control id="last_name" name="last_name" placeholder="Enter Last Name" value={user.last_name} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="timezone">Timezone</Form.Label>
                        <TimezoneSelect
                            value={user.timezone}
                            onChange={setSelectedTimezone}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <label>Update profile photo</label>
                        <AvatarInput name={"profile_image"} defaultImage={user.profile_image} onChange={setAavatarFile} />
                    </Form.Group>
                    <label>Choose Background</label>
                    <div className='row'>
                        {
                            imageList.map((imageItem, index) => (
                                <div className='col-6 col-md-4 mb-2' key={index} onClick={() => handleBackgroundChange(index + 1)}>
                                    <img className={`rounded img-fluid ${user.background == index + 1 ? 'selected' : ''}`} src={imageItem} />
                                </div>
                            ))
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
    user: state.app.user,
});

export default connect(
    mapStateToProps,
    { set_user }
)(ProfileModal);