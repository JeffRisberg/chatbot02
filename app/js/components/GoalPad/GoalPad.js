import React from 'react';

import './GoalPad.css';

const GoalPad = ({
    currentGoals,
    setCurrentType
}) => {
    return (
        <div className="goal-pad-container">
            {
                Object.keys(currentGoals).map((goalKey, index) => (
                    <div className="goal-item" key={index}>
                        <div className='text-center'>
                            <a className="goal-item-title" onClick={() => setCurrentType(goalKey)}>This {goalKey.charAt(0).toUpperCase() + goalKey.slice(1)}</a>
                        </div>
                        <ol>
                        {
                            currentGoals[goalKey].map((currentGoalItem, key) => (
                                <li key={key}>{currentGoalItem}</li>
                            ))
                        }
                        </ol>
                    </div>
                ))
            }
        </div>
    )
}

export default GoalPad