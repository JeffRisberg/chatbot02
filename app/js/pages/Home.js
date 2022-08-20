import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Form from 'react-bootstrap/Form'

import { FiCalendar } from "react-icons/fi";

import TopMenu from '../components/TopMenu/TopMenu';
import MiniTaskList from '../components/MiniTaskList/MiniTaskList';
import AddEvent from '../components/AddEvent/AddEvent';
import Todo from '../components/Todo/Todo';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Home.css';

import { set_screen } from "../actions/screen";
import { setEvents, addEvent, deleteEvent } from '../actions/events';
import CalendarEvent from '../components/CalendarEvent/CalendarEvent';

const localizer = momentLocalizer(moment)

function Home(props) {
  const user_id = props.user.id;
  const user = props.user;
  const { events } = props.event
  const firstName = user !== null ? user.first_name : '';

  const [yearlyData, setYearlyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null)
  const [eventInput, setEventInput] = useState("")
  const [goalInput, setGoalInput] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [slot, setSlot] = useState(null)
  const [todos, setTodos] = useState([])

  const [showCalendar, setShowCalendar] = useState(false)

  const host = '';

  useEffect(() => {
    (async () => {
      const result1 = await axios(host + '/api/monthly_goals/' + user_id);
      const data1 = result1.data.slice(0, 3);

      setMonthlyData(data1);

      const result2 = await axios(host + '/api/weekly_tasks/' + user_id);
      const data2 = result2.data.slice(0, 3);

      setWeeklyData(data2);

      const result3 = await axios(host + '/api/daily_tasks/' + user_id);
      const data3 = result3.data.slice(0, 3);

      setDailyData(data3);

      const result5 = await axios(host + '/api/yearly_goals/' + user_id);
      const data5 = result5.data.slice(0, 3);

      setYearlyData(data5);

      const result4 = await axios(host + '/api/events/' + user_id);
      const data4 = result4.data.filter(event => {
        return (moment.utc(event.end).toDate().getTime() - new Date().setMinutes(0, 0, 0)) > 0
      }).map((event) => {
        return {
          start: moment.utc(event.start).toDate(),
          end: moment.utc(event.end).toDate(),
          title: event.title,
          color: event.color,
          id: event.id
        }
      });

      props.setEvents(data4)

      const currentEvent = data4.find((event) => {
        const currentTimestamp = new Date().getTime()
        return event.start.getTime() <= currentTimestamp && event.end.getTime() >= currentTimestamp
      })

      setCurrentEvent(currentEvent);
      const start = new Date();
      start.setUTCHours(0,0,0,0);

      const end = new Date();
      end.setUTCHours(23,59,59,999);
      const todos = await axios(host + '/api/todos/' + user_id, {
        params: {
          start,
          end
        }
      });
      setTodos(todos.data)
    })();
  }, []);

  useEffect(() => {
    const currentEvent = events.find((event) => {
      const currentTimestamp = new Date().getTime()
      return event.start.getTime() <= currentTimestamp && event.end.getTime() >= currentTimestamp
    })

    setCurrentEvent(currentEvent);
    const interval = setInterval(() => {
      const currentEvent = events.find((event) => {
        const currentTimestamp = new Date().getTime()
        return event.start.getTime() <= currentTimestamp && event.end.getTime() >= currentTimestamp
      })

      setCurrentEvent(currentEvent);
    }, 3600000);

    return () => clearInterval(interval);
  }, [events])

  function onYearly() {
    props.set_screen('set-goal-year');
  }

  function onMonthly() {
    props.set_screen('set-goal-month');
  }

  function onWeekly() {
    props.set_screen('set-goal-week');
  }

  function onDaily() {
    props.set_screen('set-goal-day');
  }

  async function handleKeyDown(e) {
    if (e.keyCode === 13) {
      const currentTime = new Date(new Date().setMinutes(0, 0, 0))
      const event = {
        title: eventInput,
        start: currentTime,
        end: new Date(new Date(currentTime).setHours(currentTime.getHours() + 1)),
        color: '#308446'
      }

      const result = await axios.post(host + '/api/events/' + user_id, {
        title: eventInput
      });

      if (result.status === 200) {
        event.id = result.data.event_id
        setCurrentEvent(event)
        props.addEvent(event)
      }
    }
  }

  async function handleGoalSubmit(e) {
    if (e.keyCode === 13) {
      const daily_goal = {
        date_local: moment().format("YYYY-MM-DD"),
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
        name: goalInput,
        date: moment().format("YYYY-MM-DD")
      });

      if (result1.status === 200) {
        setDailyData([daily_goal])
      }
    }
  }

  async function addTodo(todo) {
    const content = {
      start_date: new Date(),
      priority: todos.length + 1,
      ...todo,
    }
    const result = await axios.post(host + '/api/todos/' + user_id, content);
    const id = result.data
    content.id = id
    content.focus = true

    const newTodos = [
      ...todos.map((todo) => ({...todo, focus: false})),
      content
    ]
    
    newTodos.sort((a, b) => a.priority - b.priority)

    setTodos(newTodos)
  }

  async function insertTodo(todo, todoId) {
    const content = {
      start_date: new Date(),
      ...todo,
    }
    const result = await axios.post(host + '/api/todos/' + user_id, content);
    const id = result.data
    content.id = id
    content.focus = true

    const todoIndex = todos.findIndex((todo) => todo.id == todoId)
    const newTodos = [
      ...todos.map((todo) => ({...todo, focus: false})),
    ]

    newTodos.splice(todoIndex + 1, 0, content)

    for (let i = todoIndex + 1; i < todos.length; i ++) {
      const todoItem = todos[i]
      if (todoItem.parent_id !== content.parent_id) {
        continue
      }
      await axios.patch(host + '/api/todos/' + user_id, {
        id: todoItem.id,
        priority: todoItem.priority + 1
      });
      newTodos[i + 1].priority = todoItem.priority + 1
    }
    
    newTodos.sort((a, b) => a.priority - b.priority)

    setTodos(newTodos)
  }

  const getAllChild = (id) => {
    let result = [];
    const childTodos = [];
    for (let i = 0; i < todos.length; i ++) {
      if (todos[i].parent_id === id) {
        childTodos.push(todos[i].id)
      }
    }
    result = result.concat(childTodos)
    for (let i = 0; i < childTodos.length; i ++) {
      result = result.concat(getAllChild(childTodos[i]))
    }

    return result;
  }

  async function updateTodoDone(todo) {
    await axios.patch(host + '/api/todos/' + user_id, todo);
    const currentTodos = [...todos]
    const children = getAllChild(todo.id);
    for (let i = 0; i < children.length; i ++) {
      await axios.patch(host + '/api/todos/' + user_id, {
        id: children[i],
        done: todo.done
      });
      const index = currentTodos.findIndex((todoItem) => todoItem.id === children[i])
      currentTodos[index] = {
        ...currentTodos[index],
        done: todo.done
      }
    }

    const index = currentTodos.findIndex((todoItem) => todoItem.id === todo.id)
    currentTodos[index] = {
      ...currentTodos[index],
      done: todo.done
    }

    currentTodos.sort((a, b) => a.priority - b.priority)

    setTodos(currentTodos)
  }

  async function updateTodo(todo) {
    await axios.patch(host + '/api/todos/' + user_id, todo);

    const currentTodos = [...todos]
    const index = currentTodos.findIndex((todoItem) => todoItem.id === todo.id)
    currentTodos[index] = {
      ...currentTodos[index],
      ...todo
    }

    currentTodos.sort((a, b) => a.priority - b.priority)

    setTodos(currentTodos)
  }

  async function multiUpdateTodo(updateTodos) {
    const currentTodos = [...todos]
    for(const todo of updateTodos) {
      await axios.patch(host + '/api/todos/' + user_id, todo);
      const index = currentTodos.findIndex((todoItem) => todoItem.id === todo.id)
      currentTodos[index] = {
        ...currentTodos[index],
        ...todo
      }
    }

    currentTodos.sort((a, b) => a.priority - b.priority)

    console.log(currentTodos)

    setTodos(currentTodos)
  }

  async function deleteTodo(todo) {
    const id = todo.id
    await axios.delete(host + '/api/todos/' + id);

    const currentTodos = [...todos]
    setTodos(currentTodos.filter(todoItem => todoItem.id !== id && todoItem.parent_id !== id))
  }

  function showAddEvent(slot) {
    setShowModal(true)
    setSlot({
      start: slot.start,
      end: slot.end,
      x: slot.box ? slot.box.x : slot.bounds.x,
      y: slot.box ? slot.box.y : slot.bounds.y
    })

    const event = {
      id: "temp_event",
      start: slot.start,
      end: slot.end,
      title: 'No Title',
      color: '#308446'
    }

    props.addEvent(event)

  }

  async function onHideEventModal(eventInput = null) {
    props.deleteEvent({
      id: "temp_event"
    })
    if (eventInput) {
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
        event.id = result1.data.event_id
        const now = new Date()
        if (now.getTime() < slot.end.getTime() && now.getTime() > slot.start.getTime()) {
          setCurrentEvent(event)
        }
        props.addEvent(event)
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
            <MiniTaskList title={"This Year's Goals"}
              tasks={yearlyData}
              hideable={true}
              detailAction={onYearly} />
          </div>
          <div className="goal-box">
            <MiniTaskList title={"This Month's Goals"}
              tasks={monthlyData}
              hideable={true}
              detailAction={onMonthly} />
          </div>
          <div className="goal-box">
            <MiniTaskList title={"This Week's Goals"}
              tasks={weeklyData}
              hideable={true}
              detailAction={onWeekly} />
          </div>
        </div>
      </div>
      <div className='home-description'>
        <div>
          <h2 style={{ textAlign: 'center', fontSize: 28 }}>Hi, {firstName}</h2>
          <h2 style={{ textAlign: 'center', fontSize: 24, marginTop: 30, marginBottom: "0px" }}>Today's top goal</h2>
          {dailyData.length > 0 && (
            <>
              <h2 style={{ textAlign: 'center', fontSize: 37, fontWeight: 400 }} className="today-top-goal">
                <Form.Check type="checkbox" label={dailyData[0].name}
                  onChange={(e) => onUpdateDailyEvent(e, dailyData[0])}
                  checked={dailyData[0].done} />
              </h2>
            </>
          )}
          {
            dailyData.length === 0 && (
              <>
                <input
                  type="input"
                  className='form-control event-input'
                  onChange={(e) => setGoalInput(e.target.value)}
                  onKeyDown={handleGoalSubmit}
                  value={goalInput}
                  placeholder="What do you want to get done today?"
                />
              </>
            )
          }
          <h2 style={{ textAlign: 'center', fontSize: 24, marginTop: 30, marginBottom: "0px" }}>Now</h2>
          {
            currentEvent && (
              <h2 style={{ textAlign: 'center', fontSize: 37, fontWeight: 400 }}>{currentEvent.title}</h2>
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
                placeholder="What is your focus this hour?"
              />
            )
          }
        </div>
      </div>
      <div className='todo-container'>
        <Todo
          todoList={todos}
          onAdd={addTodo}
          onInsert={insertTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
          onMultiUpdate={multiUpdateTodo}
          onUpdateTodoDone={updateTodoDone}
        />
      </div>
      <div className={`today-info ${showCalendar ? 'show' : ''}`}>
        <div className='d-flex align-items-center justify-content-center position-relative'>
          <p style={{
            textAlign: "center",
            color: "white",
            marginBottom: "5px",
            fontWeight: "bold",
            fontSize: "18px",
          }}>{moment(new Date()).format("ddd MMMM D, YYYY")}</p>
        </div>
        <div className='today-goal'>
          <MiniTaskList title={"Today's Goals:"}
            tasks={dailyData}
            hideable={false}
            detailAction={onDaily} />
        </div>
        <Calendar
          defaultDate={new Date()}
          defaultView="day"
          localizer={localizer}
          events={events}
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
          components={{
            event: CalendarEvent
          }}
        />
      </div>
      <div className='calendar-click' onClick={() => setShowCalendar(!showCalendar)}>
        <FiCalendar color='white'  size={32} />
      </div>

      {
        !!slot && (
          <AddEvent
            show={showModal}
            onHide={onHideEventModal}
            slot={slot}
          />
        )
      }

    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.app.user,
  event: state.app.event
});

export default connect(
  mapStateToProps,
  { set_screen, setEvents, addEvent, deleteEvent }
)(Home);
