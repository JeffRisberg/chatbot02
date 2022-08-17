import moment from 'moment';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { FiEdit } from 'react-icons/fi'
import DateSlider from '../components/DateSlider/DateSlider';
import TopMenu from '../components/TopMenu/TopMenu';
import './SetGoal.css'

import { set_screen } from "../actions/screen";
import GoalPad from '../components/GoalPad/GoalPad';

const table_list = {
    day: 'daily',
    week: 'weekly',
    month: 'monthly',
    year: 'yearly'
}

function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

const SetGoal = (props) => {
    const user_id = props.user.id;
    const initialType = props.initialType || 'year';
    const [goalList, setGoalList] = useState({})
    const [currentDate, setCurrentDate] = useState(new Date())
    const [type, setType] = useState(initialType)
    const [currentGoals, setCurrentGoals] = useState({})

    const host = '';

    const getGoals = async (type, currentDate) => {
        const result = await axios.get(host + '/api/goals/' + user_id, {
            params: {
                type: type,
                date: moment(currentDate).format('l LT')
            }
        });
        return result.data.slice(0, 3)
    }

    useEffect(() => {
        (async () => {
            console.log(type, currentDate)
            const result = await getGoals(type, currentDate);
            console.log(result)
            const data = result.reduce((prevResult, goal) => {
                prevResult[`priority_${goal.priority}`] = {
                    name: goal.name,
                    edit: false
                }
                return prevResult
            }, {});

            setGoalList(data);

            const currentGoals = {}
            const options = ["year", "month", "week", "day"]
            for (let i = 0; i < options.length; i ++) {
                if (options[i] == type) {
                    break;
                }
                const data = await getGoals(options[i], currentDate);
                currentGoals[options[i]] = data.map((dataItem) => dataItem.name)
            }

            console.log(currentGoals)

            setCurrentGoals(currentGoals)
        })()
    }, [currentDate, type])

    function onHome() {
        props.set_screen('home');
    }

    function onTalkToDara() {
      const screen_name = table_list[type];

      axios.post('/change_screen/' + screen_name, null, {
        withCredentials: true,
      })
        .then((resp) => {
          props.set_screen(screen_name, resp.data);
        });
    }

    const handleGoalSubmit = async (e, priority) => {
        if (e.keyCode === 13 && !!e.target.value) {
            const name = e.target.value
            const startOf = type === 'week' ? 'isoWeek' : type
            const goal = {
                table: table_list[type],
                priority: priority,
                name: name,
                date: moment(currentDate).startOf(startOf).format('YYYY-MM-DD'),
                user_id: user_id
            }

            const result = await axios.post('/api/set_goal', goal)
            const key = `priority_${priority}`
            if (result.status === 200) [
                setGoalList({
                    ...goalList,
                    [key]: {
                        name,
                        edit: false
                    }
                })
            ]
        }
    }

    const handleChangeGoal = (e, priority) => {
        const key = `priority_${priority}`
        setGoalList({
            ...goalList,
            [key]: {
                name: e.target.value,
                edit: true
            }
        })
    }

    const editGoal = (priority) => {
        const key = `priority_${priority}`
        setGoalList({
            ...goalList,
            [key]: {
                name: goalList[key].name,
                edit: true
            }
        })
    }

    return (
        <div className='set-goal-container'>
            <div className='d-flex justify-content-between'>
                <div>
                    <TopMenu />
                </div>
                <div>
                  <span onClick={onTalkToDara} style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontWeight: '800', fontSize: '18px',
                    color: "#C1A0A7",
                    marginRight: '10px'}}>
                    Talk to Dara
                  </span>
                  <button onClick={onHome} style={{ background: 'none', borderWidth: 0 }}>
                      <i className="bi-house-fill"
                          style={{ color: 'white', cursor: 'pointer', borderWidth: 0, fontSize: '1.8rem' }}></i>
                  </button>
                </div>
            </div>
            <div className='container'>
                <div className='d-flex align-items-center justify-content-center flex-column' style={{ flex: 1 }}>
                    <h1 style={{ fontSize: 36 }}>Set {capitalize(table_list[type])} Goals</h1>
                    <div className='d-flex w-100 align-items-center position-relative flex-column mt-4 mb-3'>
                        <DateSlider
                            date={currentDate}
                            onDateChange={setCurrentDate}
                            type={type}
                        />
                        <Form.Select aria-label="Default select example" className='w-auto type-select' value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="year">Year</option>
                            <option value="month">Month</option>
                            <option value="week">Week</option>
                            <option value="day">Day</option>
                        </Form.Select>
                    </div>
                    <h3 className='mb-5 text-center' style={{ fontWeight: 400, fontSize: 24 }}>Set no more than 3 goals. The fewer goals you have, the more focused you will be.</h3>
                    <h2 className="mb-4" style={{ fontSize: 28 }}>Top 3 Goals</h2>
                    <div className='d-flex align-items-center goal-input'>
                        <Form.Label>1.</Form.Label>
                        {
                            !!goalList['priority_1'] && goalList['priority_1'].edit === false ? (
                                <div className='d-flex align-items-center justify-content-between'>
                                    <p>{goalList['priority_1'].name}</p>
                                    <FiEdit onClick={() => editGoal(1)} size={22} />
                                </div>
                            ) : (
                                <Form.Control
                                    type="text"
                                    placeholder='The most important goal'
                                    onKeyDown={(e) => handleGoalSubmit(e, 1)}
                                    value={goalList['priority_1'] ? goalList['priority_1'].name : ''}
                                    onChange={(e) => handleChangeGoal(e, 1)}
                                />
                            )
                        }
                    </div>
                    <div className='d-flex align-items-center mt-3 goal-input'>
                        <Form.Label>2.</Form.Label>
                        {
                            !!goalList['priority_2'] && goalList['priority_2'].edit === false ? (
                                <div className='d-flex align-items-center justify-content-between'>
                                    <p>{goalList['priority_2'].name}</p>
                                    <FiEdit onClick={() => editGoal(2)} size={22} />
                                </div>
                            ) : (
                                <Form.Control
                                    type="text"
                                    placeholder='The second most important goal'
                                    onKeyDown={(e) => handleGoalSubmit(e, 2)}
                                    value={goalList['priority_2'] ? goalList['priority_2'].name : ''}
                                    onChange={(e) => handleChangeGoal(e, 2)}
                                />
                            )
                        }
                    </div>
                    <div className='d-flex align-items-center mt-3 goal-input'>
                        <Form.Label>3.</Form.Label>
                        {
                            !!goalList['priority_3'] && goalList['priority_3'].edit === false ? (
                                <div className='d-flex align-items-center justify-content-between'>
                                    <p>{goalList['priority_3'].name}</p>
                                    <FiEdit onClick={() => editGoal(3)} size={22} />
                                </div>
                            ) : (
                                <Form.Control
                                    type="text"
                                    placeholder='The third most important goal'
                                    onKeyDown={(e) => handleGoalSubmit(e, 3)}
                                    value={goalList['priority_3'] ? goalList['priority_3'].name : ''}
                                    onChange={(e) => handleChangeGoal(e, 3)}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
            {
                Object.keys(currentGoals).length > 0 && (
                    <div className='goal-list'>
                        <GoalPad currentGoals={currentGoals} setCurrentType={setType} />
                    </div>
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
)(SetGoal);
