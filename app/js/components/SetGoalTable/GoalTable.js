import React, { useEffect, useMemo, useState } from "react"
import axios from "axios";
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form'
import { FiTrash2 } from "react-icons/fi"
import TextareaAutosize from 'react-textarea-autosize';
import moment from "moment";

import
SortableTree,
{
    getTreeFromFlatData,
    changeNodeAtPath,
    removeNodeAtPath,
    insertNode,
    getNodeAtPath,
    getFlatDataFromTree,
    getVisibleNodeCount
}
    from '@nosferatu500/react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { setGoals } from "../../actions/goal";

import 'react-sortable-tree/style.css';
import './GoalTable.css'

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const GoalsTable = (props) => {
    const { goals, setGoals, flatData } = props
    const user_id = props.user.id
    const [editingGoal, setEditGoal] = useState(null);
    const [nodesHeight, setNodesHeight] = useState({})

    useEffect(() => {
        setGoals(getTreeFromFlatData({
            flatData: flatData,
            getKey: (node) => node.id,
            getParentKey: (node) => node.parent_id,
            rootKey: null
        }))
    }, [flatData])

    useEffect(() => {
        if (editingGoal) {
            const id = 'goal-input-' + editingGoal
            const input = document.getElementById(id);
            if (input) {
                input.focus()
            }
        }
    }, [editingGoal, nodesHeight])

    const addNewGoal = async (goal) => {
        const result = await axios.post("/api/new_goals/" + user_id, goal)
        return result.data
    }

    const getNodeKey = ({ treeIndex }) => treeIndex;

    const handleUpdating = (newTreeData) => {
        const newFlatData = getFlatDataFromTree({
            treeData: newTreeData,
            getNodeKey
        }).map(({ node, parentNode, treeIndex }) => ({
            ...node,
            start_date: new Date(node.start_date),
            parent_id: parentNode ? parentNode.id : null,
            order_num: treeIndex,
            priority: props.priority
        }));

        setGoals(newTreeData)
        axios.post("/api/updateGoals", newFlatData)
    }

    const handleGoalChange = (e, node, path) => {
        const name = e.target.value;

        const newTreeData = changeNodeAtPath({
            treeData: goals,
            path,
            getNodeKey,
            newNode: { ...node, name },
        })

        setGoals(newTreeData)
    }

    const updateDone = (node, done) => {
        axios.patch('/api/new_goals/' + user_id, {
            id: node.id,
            done: done
        });

        if (node.children) {
            for (const child of node.children) {
                updateDone(child, done)
            }
        }
    }

    const updateNodeDoneStatus = (node, done) => {
        node.done = done
        if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                updateNodeDoneStatus(node.children[i], done)
            }
        }
    }

    const handleDoneChange = (e, node, path) => {
        const done = e.target.checked;

        updateDone(node, done)

        const updatedNode = { ...node }

        updateNodeDoneStatus(updatedNode, done)

        const newTreeData = changeNodeAtPath({
            treeData: goals,
            path,
            getNodeKey,
            newNode: updatedNode,
        })

        handleUpdating(newTreeData)
    }

    const handleDeleteGoal = (path) => {
        const nodeItem = getNodeAtPath({
            treeData: goals,
            path,
            getNodeKey
        })
        const id = nodeItem.node.id
        axios.delete('/api/new_goals/' + id)
        let newTreeData = [...goals]
        const node = nodeItem.node
        if (node.children && node.children.length > 0 && node.expanded) {
            let childTreeIndex = path[path.length - 1] + 1;
            for (let i = 0; i < node.children.length; i ++) {
                newTreeData = removeNodeAtPath({
                    treeData: newTreeData,
                    path: [...path, childTreeIndex],
                    getNodeKey,
                })
            }
        }
        newTreeData = changeNodeAtPath({
            treeData: newTreeData,
            path,
            getNodeKey,
            newNode: {
                ...nodeItem.node,
                name: '',
                expanded: false,
                children: []
            }
        })
        handleUpdating(newTreeData)
    }

    const handleInsertNewGoal = async (path, node) => {
        let goal = {
            name: '',
            parent_id: node.id,
            done: node.done,
            priority: props.priority
        }

        let treeData = [...goals]
        let editing_id = 0
        const year = new Date().getFullYear();
        switch(node.type) {
            case 'yearly_goal':
                goal['type'] = 'quarterly_goal'

                for (let i = 1; i <= 4; i ++) {
                    goal['label'] = 'Q' + i + ' ' + year;
                    goal['start_date'] = moment([year]).quarter(i).startOf('quarter').toDate()
                    const id = await addNewGoal(goal)
                    if (i == 1) {
                        editing_id = id
                    }
                    treeData = insertNode({
                        treeData: treeData,
                        depth: path.length,
                        getNodeKey,
                        minimumTreeIndex: path[path.length - 1] + i,
                        expandParent: true,
                        newNode: {
                            id,
                            ...goal,
                        }
                    }).treeData
                }
                break;
            case 'quarterly_goal':
                goal['type'] = 'monthly_goal'
                const quarter = parseInt(node.label.split(' ')[0][1]) - 1;
                for (let i = 1; i <= 3; i ++) {
                    const index = quarter * 3 + i - 1;
                    goal['label'] =  monthNames[index] + ' ' + year;
                    goal['start_date'] = moment([year]).month(monthNames[index]).startOf('month').toDate()
                    const id = await addNewGoal(goal)
                    if (i == 1) {
                        editing_id = id
                    }
                    treeData = insertNode({
                        treeData: treeData,
                        depth: path.length,
                        getNodeKey,
                        minimumTreeIndex: path[path.length - 1] + i,
                        expandParent: true,
                        newNode: {
                            id,
                            ...goal,
                        }
                    }).treeData
                }
                break;
            case 'monthly_goal':
                goal['type'] = 'weekly_goal'
                const monthName = node.label.split(' ')[0]
                let monday = moment().month(monthName)
                    .startOf('month')
                    .day("Monday");
                if (monday.date() > 7) monday = monday.add(7,'d');
                let month = monday.month();
                let i = 1;
                while(month === monday.month()){
                    goal['label'] = 'Week ' + monday.format('M/D');
                    goal['start_date'] = monday.toDate()
                    const id = await addNewGoal(goal)
                    if (i == 1) {
                        editing_id = id
                    }
                    treeData = insertNode({
                        treeData: treeData,
                        depth: path.length,
                        getNodeKey,
                        minimumTreeIndex: path[path.length - 1] + i,
                        expandParent: true,
                        newNode: {
                            id,
                            ...goal,
                        }
                    }).treeData
                    monday = monday.add(7,'d');
                    i ++;
                }
                break;
            case 'weekly_goal':
                goal['type'] = 'daily_goal'
                const weekDate = node.label.split(' ')[1]
                const monthNum = parseInt(weekDate.split('/')[0])
                const date = parseInt(weekDate.split('/')[1])
                let start_date = moment([year, monthNum - 1, date])
                for (let i = 0; i < 7; i ++) {
                    goal['label'] = start_date.format('ddd M/D');
                    goal['start_date'] = start_date.toDate()
                    const id = await addNewGoal(goal)
                    if (i == 0) {
                        editing_id = id
                    }
                    treeData = insertNode({
                        treeData: treeData,
                        depth: path.length,
                        getNodeKey,
                        minimumTreeIndex: path[path.length - 1] + i + 1,
                        expandParent: true,
                        newNode: {
                            id,
                            ...goal,
                        }
                    }).treeData
                    start_date = start_date.add(1,'d');
                }
                break;
            case 'daily_goal':
                goal['type'] = 'daily_task'
                for (let i = 0; i < 3; i ++) {
                    goal['label'] = node.label + '_' + i;
                    goal['start_date'] = node.start_date
                    const id = await addNewGoal(goal)
                    if (i == 0) {
                        editing_id = id
                    }
                    treeData = insertNode({
                        treeData: treeData,
                        depth: path.length,
                        getNodeKey,
                        minimumTreeIndex: path[path.length - 1] + i + 1,
                        expandParent: true,
                        newNode: {
                            id,
                            ...goal,
                        }
                    }).treeData
                }
                break;
        }

        handleUpdating(treeData)
        setEditGoal(editing_id)
    }

    const expandGoal = (path, node) => {
        if (node.children) {
            const newTreeData = changeNodeAtPath({
                treeData: goals,
                path,
                getNodeKey,
                newNode: { ...node, expanded: true },
            })
            handleUpdating(newTreeData)
            const id = node.children[0].id
            setEditGoal(id)
        } else {
            const siblingPath = [...path]
            siblingPath[siblingPath.length - 1] += 1;
            const sibling = getNodeAtPath({
                treeData: goals,
                path:siblingPath,
                getNodeKey,
            })

            if (!sibling) {
                const nextParentPath = [...path]
                nextParentPath.pop()
                nextParentPath[nextParentPath.length - 1] = path[path.length - 1] + 1
                console.log(nextParentPath);
                const nextParent = getNodeAtPath({
                    treeData: goals,
                    path: nextParentPath,
                    getNodeKey,
                })
                if (nextParent) {
                    const {node} = nextParent;
                    setEditGoal(node.id)
                }
            } else {
                const {node} = sibling;
                setEditGoal(node.id)
            }
        }
    }

    const handleGoalKeyDown = async (e, node, path) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            if ((!node.children || node.children.length == 0) && node.type != 'daily_task') {
                handleInsertNewGoal(path, node)
            } else {
                expandGoal(path, node)
            }
        }
    }

    const getNodeHeight = (node) => {
        let height = Math.ceil(node.name.length / 30) * 29
        if (node.name.length === 0) {
            height = 29
        }
        if (document.getElementById('goal-input-' + node.id)) {
            height = document.getElementById('goal-input-' + node.id).scrollHeight
        }
        if (node.expanded && node.children) {
            for (const child of node.children) {
                height += getNodeHeight(child)
            }
        }

        return height
    }

    const treeHeight = useMemo(() => {
        let height = 0
        for (const goal of goals) {
            height += getNodeHeight(goal)
        }
        return height + 30
    }, [goals, nodesHeight])

    return (
        <div style={{ height: treeHeight, display: getVisibleNodeCount({ treeData: goals }) > 0 ? 'block' : 'none' }} className="tree-container">
            <SortableTree
                treeData={goals}
                onChange={treeData => handleUpdating(treeData)}
                getNodeKey={getNodeKey}
                // maxDepth={2}
                theme={FileExplorerTheme}
                isVirtualized={false}
                rowHeight={(treeIndex, node, path) => {
                    let height = Math.ceil(node.name.length / 30) * 29
                    if (node.name.length === 0) {
                        height = 29
                    }

                    if (document.getElementById('goal-input-' + node.id)) {
                        height = document.getElementById('goal-input-' + node.id).scrollHeight
                    }
                    return height
                }}
                reactVirtualizedListProps={{
                    autoHeight: "auto"
                }}
                scaffoldBlockPxWidth={20}
                canDrag={({node}) => node.type === 'daily_task'}
                canDrop={({prevParent, nextParent}) => prevParent.id === nextParent.id}
                canNodeHaveChildren={(node) => {
                    console.log(node)
                    return node.type !== 'daily_task'
                }}
                generateNodeProps={({ node, path }) => {
                    return {
                        title: (
                            <div className="goal-item-wrapper">
                                <Form.Check
                                    type="checkbox"
                                    id={`goal-${node.id}`}
                                    checked={node.done}
                                    className={`goal-item ${node.done ? 'done' : ''}`}
                                    onChange={(e) => handleDoneChange(e, node, path)}
                                />
                                <TextareaAutosize
                                    className={`goal-inline-input ${node.done ? 'text-decoration-line-through' : ''}`}
                                    id={"goal-input-" + node.id}
                                    value={node.name}
                                    onChange={(e) => handleGoalChange(e, node, path)}
                                    onKeyDown={(e) => handleGoalKeyDown(e, node, path)}
                                    onFocus={() => setEditGoal(node.id)}
                                    autoFocus={editingGoal === node.id}
                                    onHeightChange={(height) => { setNodesHeight({ ...nodesHeight, [node.id]: height }) }}
                                />
                                {
                                    node.type !== 'daily_task' && (
                                        <span className="goal-inline-input-label">({node.label})</span>
                                    )
                                }
                            </div>
                        ),
                        buttons: [
                            <FiTrash2 className="goal-delete-btn" onClick={() => handleDeleteGoal(path)} />
                        ],
                    }
                }}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.app.user,
    goals: state.app.goal.goals
});

export default connect(
    mapStateToProps,
    {
        setGoals
    }
)(GoalsTable);
