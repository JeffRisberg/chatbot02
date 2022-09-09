import React, { useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import MiniTaskList from '../MiniTaskList/MiniTaskList'

import './GoalCardBox.css'

const DragBox = ({
  id,
  left,
  children
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'box',
      item: { id, left },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left],
  )

  if (isDragging) {
    return <div ref={drag} />
  }

  return (
    <div
      className='goal-card-box'
      ref={drag}
      style={{ left }}
    >
      {children}
    </div>
  )
}

const GoalCardBox = (props) => {
  const [boxes, setBoxes] = useState({})

  useEffect(() => {
    setBoxes(props)
  }, [props])

  const moveBox = (id, left) => {
    setBoxes({
      ...boxes,
      [id]: {
        ...boxes[id],
        left
      }
    })
  }

  const [, drop] = useDrop(
    () => ({
      accept: 'box',
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        moveBox(item.id, left < 0 ? 0 : left)
        return undefined
      }
    }),
    [moveBox]
  )

  return (
    <div ref={drop} className="goal-card-box-container">
      {
        Object.keys(boxes).map((key) => {
          const { left, items, onAction, title } = boxes[key]
          return (
            <DragBox
              key={key}
              id={key}
              left={left}
            >
              <div className='goal-box'>
                <MiniTaskList
                  title={title}
                  tasks={items}
                  hideable={true}
                  detailAction={onAction}
                />
              </div>
            </DragBox>
          )
        })
      }
    </div>
  )
}

export default GoalCardBox;