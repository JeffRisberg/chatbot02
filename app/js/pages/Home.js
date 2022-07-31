import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment'
import {Calendar, momentLocalizer} from 'react-big-calendar';

import TopMenu from '../components/TopMenu/TopMenu';
import MiniTaskList from '../components/MiniTaskList/MiniTaskList';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Home.css';

import {set_screen} from "../actions/screen";

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
      const data3 = result3.data.slice(0, 1);

      setDailyData(data3);

      // const result4 = await axios(host + '/api/today_events/');
      // const data4 = result4.data.map((event) => {
      //   return {
      //     start: new Date(event.start.dateTime),
      //     end: new Date(event.end.dateTime),
      //     title: event.summary
      //   }
      // });
      // console.log(data4)

      const result5 = await axios(host + '/api/events/' + user_id);
      const data5 = result5.data.map((event) => {
        return {
          start: new Date(event.start),
          end: new Date(event.end),
          title: event.title,
          color: event.color
        }
      });

      setTodayEvents(data5)

      const currentEvent = data5.find((event) => {
        const currentTimestamp = new Date().getTime()
        return event.start.getTime() <= currentTimestamp && event.end.getTime() >= currentTimestamp
      })

      setCurrentEvent(currentEvent)
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentEvent = todayEvents.find((event) => {
        const currentTimestamp = new Date().getTime()
        return event.start.getTime() <= currentTimestamp && event.end.getTime() >= currentTimestamp
      })

      setCurrentEvent(currentEvent)
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

  function eventStyleGetter(event) {
    let style = {
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
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
      <div style={{height: '45px'}}>
        <div style={{float: 'left'}}>
          <TopMenu/>
        </div>
        <div className="goal-box">
          <MiniTaskList title={"This Week's Goals"}
                        tasks={weeklyData}
                        detailAction={onWeekly}/>
        </div>
        <div className="goal-box">
          <MiniTaskList title={"This Month's Goals"}
                        tasks={monthlyData}
                        detailAction={onMonthly}/>
        </div>
      </div>
      <div style={{
        clear: 'both',
        height: '550px',
        color: 'white',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>
          <h1 style={{textAlign: 'center'}}>Hi, {firstName}</h1>
          {
            currentEvent && (
              <h2 style={{textAlign: 'center'}}>{currentEvent.title}</h2>
            )
          }
          {dailyData.length > 0 &&
          <h2 style={{textAlign: 'center'}}>Now</h2>}
          {dailyData.length === 0 &&
          <h2 style={{textAlign: 'center'}}>What do you want to work on today?</h2>}
          {dailyData.map((goal) => (
            <h1 style={{textDecoration: 'underline', textAlign: 'center'}} key={goal.id}>
              {goal.name}
            </h1>
          ))}
        </div>
      </div>
      <div className='today-info'>
        <div className='today-goal'>
          <MiniTaskList title={"Today's Goals:"}
                        showDate={true}
                        tasks={dailyData}
                        detailAction={onDaily}/>
        </div>
        <Calendar
          defaultDate={new Date()}
          defaultView="day"
          localizer={localizer}
          events={todayEvents}
          toolbar={false}
          showMultiDayTimes
          eventPropGetter={eventStyleGetter}
          min={new Date("1972-01-01 05:00:00")}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.app.user
});

export default connect(
  mapStateToProps,
  {set_screen}
)(Home);
