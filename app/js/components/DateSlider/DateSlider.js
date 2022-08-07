import React from 'react';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

import './DateSlider.css'

const DateSlider = ({date, type, onDateChange}) => {
    const handleNext = () => {
        switch(type) {
            case 'month':
                onDateChange(new Date(new Date(date).setMonth(date.getMonth() + 1)))
                break;
            case 'week':
                onDateChange(new Date(new Date(date).setDate(date.getDate() + 7)))
                break;
            case 'day':
                onDateChange(new Date(new Date(date).setDate(date.getDate() + 1)))
                break;
        }
    }
    const handlePrev = () => {
        switch(type) {
            case 'month':
                onDateChange(new Date(new Date(date).setMonth(date.getMonth() - 1)))
                break;
            case 'week':
                onDateChange(new Date(new Date(date).setDate(date.getDate() - 7)))
                break;
            case 'day':
                onDateChange(new Date(new Date(date).setDate(date.getDate() - 1)))
                break;
        }
    }

    const getDateString = () => {
        switch(type) {
            case 'month':
                return moment(date).format("MMMM YYYY")
            case 'week':
                return moment(date).startOf('isoWeek').format("MMM D") + ' - ' + moment(date).endOf('isoWeek').format("MMM D, YYYY")
            case 'day':
                return moment(date).format("MMMM D, YYYY")
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center date-slider-container'>
            <Button className='btn-date-slider' onClick={handlePrev}>&lt;</Button>
            <h2 className='date-slider-content'>{getDateString()}</h2>
            <Button className='btn-date-slider' onClick={handleNext}>&gt;</Button>
        </div>
    )
}

export default DateSlider