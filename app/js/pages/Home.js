import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Form from 'react-bootstrap/Form'

import TopMenu from '../components/TopMenu/TopMenu';
import MiniTaskList from '../components/MiniTaskList/MiniTaskList';
import AddEvent from '../components/AddEvent/AddEvent';
//import Todo from '../components/Todo/Todo';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Home.css';

import { set_screen } from "../actions/screen";

const localizer = momentLocalizer(moment)

function Home(props) {
  const user_id = props.user.id;
  const user = props.user;
  const firstName = user !== null ? user.first_name : '';

  const [monthlyData, setMonthlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [todayEvents, setTodayEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null)
  const [eventInput, setEventInput] = useState("")
  const [goalInput, setGoalInput] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [slot, setSlot] = useState(null)

  const host = '';

  useEffect(() => {
    (async () => {

      console.log("async called")

      const result1 = await axios(host + '/api/monthly_goals/' + user_id);
      const data1 = result1.data.slice(0, 3);

      setMonthlyData(data1);

      const result2 = await axios(host + '/api/weekly_tasks/' + user_id);
      const data2 = result2.data.slice(0, 3);

      setWeeklyData(data2);

      const result3 = await axios(host + '/api/daily_tasks/' + user_id);
      const data3 = result3.data.slice(0, 3);

      setDailyData(data3);

      const result4 = await axios(host + '/api/events/' + user_id);
      const data4 = result4.data.filter(event => {
        return (new Date(event.end).getTime() - new Date().setMinutes(0,0,0)) > 0
      }).map((event) => {
        return {
          start: new Date(event.start),
          end: new Date(event.end),
          title: event.title,
          color: event.color
        }
      });

      setTodayEvents(data4);

      const currentEvent = data4.find((event) => {
        const currentTimestamp = new Date().getTime()
        return event.start.getTime() <= currentTimestamp && event.end.getTime() >= currentTimestamp
      })

      setCurrentEvent(currentEvent);
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentEvent = todayEvents.find((event) => {
        const currentTimestamp = new Date().getTime()
        return event.start.getTime() <= currentTimestamp && event.end.getTime() >= currentTimestamp
      })

      setCurrentEvent(currentEvent);
    }, 3600000);

    return () => clearInterval(interval);
  }, [todayEvents])

  function onMonthly() {
    const my_name = 'monthly';
    axios.post(host + '/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(my_name, resp.data);
      });
  }

  function onWeekly() {
    const my_name = 'weekly';

    axios.post(host + '/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(my_name, resp.data);
      });
  }

  function onDaily() {
    const my_name = 'daily';

    axios.post(host + '/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(my_name, resp.data);
      });
  }

  async function handleKeyDown (e) {
    if (e.keyCode === 13) {
      const currentTime = new Date(new Date().setMinutes(0, 0, 0))
      const event = {
        title: eventInput,
        start: currentTime,
        end: new Date(currentTime).setHours(currentTime.getHours() + 1),
        color: '#308446'
      }

      const result1 = await axios.post(host + '/api/events/' + user_id, {
        title: eventInput
      });

      if (result1.status === 200) {
        setCurrentEvent(event)
        setTodayEvents([...todayEvents, event])
      }
    }
  }

  async function handleGoalSubmit (e) {
    if (e.keyCode === 13) {
      const currentTime = new Date(new Date().setHours(0, 0, 0, 0))

      const daily_goal = {
        date_local: currentTime,
        done: 0,
        duration: null,
        end: null,
        id: 1,
        name: goalInput,
        parent_id: null,
        priority: 1,
        start: null,
        why: null
      }

      const result1 = await axios.post(host + '/api/daily_tasks/' + user_id, {
        goal: goalInput
      });

      if (result1.status === 200) {
        setDailyData([daily_goal])
      }
    }
  }

  function showAddEvent(slot) {
    console.log(slot)
    setShowModal(true)
    setSlot({
      start: slot.start,
      end: slot.end,
      x: slot.box ? slot.box.x : slot.bounds.x,
      y: slot.box ? slot.box.y : slot.bounds.y
    })
  }

  async function onHideEventModal(eventInput = null) {
    if(eventInput) {
      const event = {
        title: eventInput,
        start: slot.start,
        end: slot.end,
        color: '#308446'
      }

      const result1 = await axios.post(host + '/api/events/' + user_id, {
        title: eventInput,
        start: slot.start,
        end: slot.end,
      });

      if (result1.status === 200) {
        const now = new Date()
        if (now.getTime() < slot.end.getTime() && now.getTime() > slot.start.getTime()) {
          setCurrentEvent(event)
        }
        setTodayEvents([...todayEvents, event])
      }
    }
    setShowModal(false)
  }

  async function onUpdateDailyEvent(e, event) {
    const checked = e.target.checked
    const updateData = {
      table: 'daily',
      id: event.id,
      done: checked,
    }
    const result = await axios.put(host + '/api/tasks', updateData)
    if (result.status == 200) {
      const currentDailyData = [...dailyData]
      currentDailyData[0].done = checked
      setDailyData(currentDailyData)
    }
  }

  function eventStyleGetter(event) {
    let style = {
      opacity: 0.8,
      color: 'white',
      borderTopWidth: "1px",
      borderBottomWidth: "1px",
      borderStyle: "solid",
      borderColor: '#eaf6ff',
      borderRadius: "3px",
      display: 'block',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontSize: "13px",
      fontWeight: 500
    };
    if (event.color) {
      style.backgroundColor = event.color
    }

    return {
      style: style
    };
  }

  return (
    <div className='home-container'>
      <div>
        <div className="d-flex justify-content-between">

        </div>
        <div style={{ float: 'left' }}>
          <TopMenu />
        </div>
        <div className="goal-box-container">
          <div className="goal-box">
            <MiniTaskList title={"This Month's Goals"}
              tasks={monthlyData}
              detailAction={onMonthly} />
          </div>
          <div className="goal-box">
            <MiniTaskList title={"This Week's Goals"}
              tasks={weeklyData}
              detailAction={onWeekly} />
          </div>
        </div>
      </div>
      <div className='home-description'>
        <div>
          <h2 style={{ textAlign: 'center', fontSize: 28 }}>Hi, {firstName}</h2>
          <h2 style={{ textAlign: 'center', fontSize: 24, marginTop: 30, marginBottom: "0px" }}>Today's top goal</h2>
          {dailyData.length > 0 && (
            <h2 style={{ textAlign: 'center', fontSize: 40 }} className="today-top-goal">
              <Form.Check type="checkbox" label={dailyData[0].name}
                          onChange={(e) => onUpdateDailyEvent(e, dailyData[0])}
                          checked={dailyData[0].done} />
            </h2>
          )}
          {
            dailyData.length === 0 && (
              <input
                type="input"
                className='form-control event-input'
                onChange={(e) => setGoalInput(e.target.value)}
                onKeyDown={handleGoalSubmit}
                value={goalInput}
                placeholder="Enter goal"
              />
            )
          }
          <h2 style={{ textAlign: 'center', fontSize: 24, marginTop: 30, marginBottom: "0px" }}>Now</h2>
          {
            currentEvent && (
              <h2 style={{ textAlign: 'center', fontSize: 40 }}>{currentEvent.title}</h2>
            )
          }

          {
            !currentEvent && (
              <input
                type="input"
                className='form-control event-input'
                onChange={(e) => setEventInput(e.target.value)}
                onKeyDown={handleKeyDown}
                value={eventInput}
                placeholder="Enter event"
              />
            )
          }
        </div>
      </div>
      <div className='today-info'>
        <p style={{
          textAlign: "center",
          color: "white",
          marginBottom: "5px",
          fontWeight: "bold",
          fontSize: "18px",
        }}>{moment(new Date()).format("ddd MMMM D, YYYY")}</p>
        <div className='today-goal'>
          <MiniTaskList title={"Today's Goals:"}
            showDate={false}
            tasks={dailyData}
            detailAction={onDaily} />
        </div>
        <Calendar
          defaultDate={new Date()}
          defaultView="day"
          localizer={localizer}
          events={todayEvents}
          toolbar={false}
          formats={{
            eventTimeRangeFormat: () => { return "" }
          }}
          showMultiDayTimes
          eventPropGetter={eventStyleGetter}
          min={new Date(new Date().setMinutes(0, 0, 0))}
          style={{
            height: (24 - new Date().getHours() * 40),
            maxHeight: 600
          }}
          selectable
          onSelectSlot={(slot) => showAddEvent(slot)}
        />
      </div>
      {/* <div className='todo-container'>
        <Todo
          todoList={[
            'Study',
            'Work',
            'Enjoy'
          ]}
        />
      </div> */}
      {
        !!slot && (
          <AddEvent
            show={showModal}
            onHide={onHideEventModal}
            x={slot.x}
            y={slot.y}
          />
        )
      }
      
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.app.user
});

export default connect(
  mapStateToProps,
  { set_screen }
)(Home);
