import React from 'react';
import moment from 'moment';
import {Button, ButtonGroup} from 'react-bootstrap';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import './CalendarToolbar.css';

const CalendarToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const gotoView = (view) => {
    toolbar.onView(view);
  }

  const label = () => {
    const date = moment(toolbar.date);
    console.log(toolbar)
    switch (toolbar.view) {
      case 'month':
        return moment(date).format("MMMM YYYY")
      case 'week':
        return moment(date).startOf('isoWeek').format("MMM D") + ' - ' + moment(date).endOf('isoWeek').format("MMM D, YYYY")
      case 'day':
        return moment(date).format("MMMM D, YYYY")
    }
  };

  return (
    <div className={'d-flex align-items-center justify-content-between'}>
      <div></div>
      <div className='d-flex align-items-center h3'>
        <FiChevronLeft onClick={goToBack}/>
        {label()}
        <FiChevronRight onClick={goToNext}/>
      </div>
      <div className={''}>
        <ButtonGroup className="mb-2">
          {
            toolbar.views.map((view, key) => (
              <Button key={key} onClick={() => gotoView(view)} className={"toolbar-view-btn"}>{view}</Button>
            ))
          }
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CalendarToolbar;
