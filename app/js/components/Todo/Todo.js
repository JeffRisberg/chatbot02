import React, { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { connect } from 'react-redux'

import Form from 'react-bootstrap/Form'
import { FiTrash2, FiChevronDown } from "react-icons/fi"
import TextareaAutosize from 'react-textarea-autosize';

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
import { setTodos } from "../../actions/todo";

import './Todo.css'
import 'react-sortable-tree/style.css';

const todoCategories = ["Today", "Done"];

const Todo = (props) => {
  const {todos, setTodos, showTodo, setShowTodo} = props
  const user_id = props.user.id
  const [flatTodoList, setFlatTodoList] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [editingTodo, setEditTodo] = useState(null);
  const [todoCategory, setTodoCategory] = useState("Today")
  const [showDropdown, setShowDropdown] = useState(false);
  const [nodesHeight, setNodesHeight] = useState({})

  useEffect(() => {
    (async () => {
      const start = new Date();
      start.setUTCHours(0, 0, 0, 0);

      const end = new Date();
      end.setUTCHours(23, 59, 59, 999);
      const flatTodos = await axios('/api/todos/' + user_id, {
        params: {
          start,
          end
        }
      });
      setFlatTodoList(flatTodos.data)
    })()

  }, [todoCategory])

  useEffect(() => {
    if (todoCategory === 'Done') {
      const doneList = flatTodoList.filter((todo) => todo.done).map(node => ({ ...node, title: node.name }))
      setTodos(getTreeFromFlatData({
        flatData: doneList,
        getKey: (node) => node.id,
        getParentKey: (node) => node.parent_id,
        rootKey: null
      }))
    } else {
      const filteredTodoList = flatTodoList.filter((todo) => !todo.done).map(node => ({ ...node, title: node.name }))
      setTodos(getTreeFromFlatData({
        flatData: filteredTodoList,
        getKey: (node) => node.id,
        getParentKey: (node) => node.parent_id,
        rootKey: null
      }))
    }
  }, [flatTodoList, todoCategory])

  useEffect(() => {
    if (editingTodo) {
      const id = 'todo-input-' + editingTodo
      const input = document.getElementById(id);
      if (input) {
        input.focus()
      }
    }
  }, [editingTodo, nodesHeight])

  const addNewTodo = async (todo) => {
    const result = await axios.post("/api/todos/" + user_id, todo)
    return result.data
  }

  const getNodeKey = ({ treeIndex }) => treeIndex;

  const handleUpdating = (newTreeData)  => {
    const newFlatData = getFlatDataFromTree({
      treeData: newTreeData,
      getNodeKey
    }).map(({ node, parentNode, treeIndex }) => ({
      ...node,
      name: node.title,
      start_date: new Date(node.start_date),
      parent_id: parentNode ? parentNode.id : null,
      priority: treeIndex
    }));

    setTodos(newTreeData)
    axios.post("/api/updateTodos", newFlatData)
  }

  const handleTodoChange = (e, node, path) => {
    const title = e.target.value;

    const newTreeData = changeNodeAtPath({
      treeData: todos,
      path,
      getNodeKey,
      newNode: { ...node, title },
    })

    setTodos(newTreeData)
  }

  const updateDone = (node, done) => {
    axios.patch('/api/todos/' + user_id, {
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
      for (let i = 0; i < node.children.length; i ++) {
        updateNodeDoneStatus(node.children[i], done)
      }
    }
  }

  const handleDoneChange = (e, node, path) => {
    const done = e.target.checked;

    updateDone(node, done)

    const updatedNode = {...node}

    updateNodeDoneStatus(updatedNode, done)

    const newTreeData = changeNodeAtPath({
      treeData: todos,
      path,
      getNodeKey,
      newNode: updatedNode,
    })

    handleUpdating(newTreeData)
  }

  const handleDeleteTodo = (path) => {
    const nodeItem = getNodeAtPath({
      treeData: todos,
      path,
      getNodeKey
    })
    const id = nodeItem.node.id
    axios.delete('/api/todos/' + id)
    const newTreeData = removeNodeAtPath({
      treeData: todos,
      path,
      getNodeKey,
    })
    handleUpdating(newTreeData)
  }

  const handleAddNewTodo = (todo) => {
    let newTreeData = [...todos]
    newTreeData = newTreeData.concat(todo)
    handleUpdating(newTreeData)
    setEditTodo(todo.id)
  }

  const handleInsertNewTodo = async (path) => {
    const todo = {
      name: '',
      done: (todoCategory === 'Done'),
      start_date: new Date(),
    }
    const id = await addNewTodo(todo)
    const newTreeInfo = insertNode({
      treeData: todos,
      depth: path.length - 1,
      getNodeKey,
      minimumTreeIndex: path[path.length - 1] + 1,
      expandParent: true,
      newNode: {
        id,
        ...todo,
        title: todo.name
      }
    })

    handleUpdating(newTreeInfo.treeData)
    setEditTodo(id)
  }

  const handleMoveNode = (node, path, isUp) => {
    const newTreeData = removeNodeAtPath({
      treeData: todos,
      path,
      getNodeKey,
    })

    if ((isUp && path.length === 1)) {
      return;
    }
    if (isUp) {
      let minimumTreeIndex = path[0] + 1
      const newTreeInfo = insertNode({
        treeData: newTreeData,
        depth: path.length - 2,
        getNodeKey,
        minimumTreeIndex,
        expandParent: true,
        newNode: node
      })
      const treeData = newTreeInfo.treeData
      handleUpdating(treeData)
    }
    if (!isUp) {

      if (path[path.length - 1] == 0) return
      const newTreeInfo = insertNode({
        treeData: newTreeData,
        depth: path.length,
        minimumTreeIndex: path[path.length - 1],
        getNodeKey,
        expandParent: true,
        newNode: node,
        ignoreCollapsed: true
      })
      const treeData = newTreeInfo.treeData
      handleUpdating(treeData)
    }
  }

  const handleKeyDown = async (e) => {
    if (e.keyCode === 13) {
      const todo = {
        name: newTodo,
        done: (todoCategory === 'Done'),
        start_date: new Date()
      }
      const id = await addNewTodo(todo)
      handleAddNewTodo({
        id,
        ...todo,
        title: todo.name
      })
      setNewTodo('')
    }
  }

  const handleTodoKeyDown = async (e, node, path) => {
    if (e.shiftKey && e.keyCode == 9) {
      e.preventDefault();
      handleMoveNode(node, path, true)
    } else if (e.keyCode === 9) {
      e.preventDefault()
      handleMoveNode(node, path, false)
    } else if (e.keyCode === 13) {
      e.preventDefault()
      handleInsertNewTodo(path)
    }
  }

  const toggleDropDown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleSelectCategory = (todoCategoryItem) => {
    setTodoCategory(todoCategoryItem)
    setShowDropdown(!showDropdown)
  }

  const getNodeHeight = (node) => {
    let height = Math.ceil(node.title.length / 30) * 24
    if (node.title.length === 0) {
      height = 24
    }
    if (document.getElementById('todo-input-' + node.id)) {
      height = document.getElementById('todo-input-' + node.id).scrollHeight
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
    for (const todo of todos) {
      height += getNodeHeight(todo)
    }
    return height + 10 > 600 ? 600 : (height + 10)
  }, [todos, nodesHeight])

  return (
    <>
      <button className="btn-todo-mobile" onClick={() => setShowTodo(!showTodo)}>Todo</button>
      <div className={`todo-list-view ${showTodo ? "show" : ""}`}>
        <div className="d-flex align-items-center mb-2 position-relative">
          <h3 className="todo-title">{todoCategory}</h3>
          <FiChevronDown color="white" size={22} className="ms-1" onClick={toggleDropDown} />
          {
            showDropdown && (
              <div className="todo-category-selector">
                {
                  todoCategories.map((todoCategoryItem, index) => (
                    <div key={index} onClick={() => handleSelectCategory(todoCategoryItem)}>{todoCategoryItem}</div>
                  ))
                }
              </div>
            )
          }
        </div>
        <div style={{ height: treeHeight, display: getVisibleNodeCount({treeData: todos}) > 0 ? 'block' : 'none' }} className="tree-container">
          <SortableTree
            treeData={todos}
            onChange={treeData => handleUpdating(treeData)}
            getNodeKey={getNodeKey}
            // maxDepth={2}
            theme={FileExplorerTheme}
            isVirtualized={false}
            rowHeight={(treeIndex, node) => {
              let height = Math.ceil(node.title.length / 30) * 24
              if (node.title.length === 0) {
                height = 24
              }

              if (document.getElementById('todo-input-' + node.id)) {
                height = document.getElementById('todo-input-' + node.id).scrollHeight
              }
              return height
            }}
            reactVirtualizedListProps={{
              autoHeight: "auto"
            }}
            scaffoldBlockPxWidth={20}
            generateNodeProps={({ node, path }) => {
              return {
                title: (
                  <div className="todo-item-wrapper">
                    <Form.Check
                      type="checkbox"
                      id={`todo-${node.id}`}
                      checked={node.done}
                      className={`todo-item ${node.done ? 'done' : ''}`}
                      onChange={(e) => handleDoneChange(e, node, path)}
                    />
                    <TextareaAutosize
                      className={`todo-inline-input ${node.done ? 'text-decoration-line-through' : ''}`}
                      id={"todo-input-" + node.id}
                      value={node.title}
                      onChange={(e) => handleTodoChange(e, node, path)}
                      onKeyDown={(e) => handleTodoKeyDown(e, node, path)}
                      onFocus={() => setEditTodo(node.id)}
                      autoFocus={editingTodo === node.id}
                      onHeightChange={(height) => {setNodesHeight({...nodesHeight, [node.id]: height})}}
                    />
                  </div>
                ),
                buttons: [
                  <FiTrash2 className="todo-delete-btn" onClick={() => handleDeleteTodo(path)} />
                ],
              }
            }}
          />
        </div>

        <input className="form-control todo-input" placeholder="New Todo" value={newTodo} onChange={(e) => {
          setNewTodo(e.target.value)
        }} onKeyDown={handleKeyDown} />
      </div>
      <button className="btn-todo" onClick={() => setShowTodo(!showTodo)}>Todo</button>
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.app.user,
  todos: state.app.todo.todos
});

export default connect(
  mapStateToProps,
  {
    setTodos
  }
)(Todo);
