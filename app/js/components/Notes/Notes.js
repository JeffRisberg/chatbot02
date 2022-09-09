import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi'

import './Notes.css'

const Notes = ({ showNotes, setShowNotes }) => {
  const [notes, setNotes] = useState([])
  const [search, setSearch] = useState('')
  const [selectedNoteId, setSelectedNoteId] = useState(0)
  const titleEditor = useRef()
  const detailEditor = useRef()

  useEffect(() => {
    (async () => {
      const result = await axios.get('/api/notes')
      if (result.status === 200) {
        setNotes(result.data.map((note) => {
          return {
            ...note,
            created: new Date(note.created),
            updated: new Date(note.updated),
          }
        }))
        if (result.data.length > 0) {
          setSelectedNoteId(result.data[0].id)
        }
      }
    })()
  }, [])

  const getTime = (date) => {
    const md = moment(date)
    const isToday = md.isSame(new Date(), "day");
    if (isToday) {
      return md.format('h:mm A')
    } else {
      return md.format('M/DD')
    }
  }

  const handleAddNote = async () => {
    const newNote = {
      name: 'Empty Name',
      details: ''
    }
    const res = await axios.post('/api/notes', newNote)
    if (res.status === 200) {
      newNote.id = res.data
    }

    setNotes([newNote, ...notes])
    setSelectedNoteId(newNote.id)
  }

  const handleDeleteNote = () => {
    if (selectedNoteId) {
      setNotes(notes.filter((note) => note.id !== selectedNoteId))
      axios.delete(`/api/notes/${selectedNoteId}`)
    }
  }

  const handleChangeNote = (field, value) => {
    const updatedNotes = [...notes]
    const noteIndex = updatedNotes.findIndex((note) => note.id === selectedNoteId)

    // updatedNotes[noteIndex][field] = value
    // axios.patch(`/api/notes`, {
    //   id: selectedNoteId,
    //   [field]: value
    // })

    // setNotes(updatedNotes)

    if (field === 'details') {
      const name = value.split('\n')[0]
      updatedNotes[noteIndex]['name'] = name
      let details = value.replace(name, '')
      // if (details[0] === '\n') {
      //   details = details.slice(1)
      // }
      updatedNotes[noteIndex]['details'] = details
      setNotes(updatedNotes)
      axios.patch(`/api/notes`, {
        id: selectedNoteId,
        name,
        details
      })
    } else {
      updatedNotes[noteIndex][field] = value
      setNotes(updatedNotes)
      axios.patch(`/api/notes`, {
        id: selectedNoteId,
        [field]: value
      })
    }
  }

  const selectedNote = useMemo(() => {
    if (notes && selectedNoteId) {
      return notes.find((note) => note.id === selectedNoteId)
    }
    return false
  }, [notes, selectedNoteId])

  const filteredNotes = useMemo(() => {
    if (!search) return notes
    if (!notes) return []
    return notes.filter((note) => note.name.indexOf(search) >= 0 || note.details.indexOf(search) >= 0) || []
  }, [search, notes])

  const getDetail = (selectedNote) => {
    if (selectedNote.details) {
      return selectedNote.name + selectedNote.details;  
    } else if (selectedNote.name) {
      return selectedNote.name;  
    }
  }

  const getNoteTime = (selectedNote) => {
    return moment(selectedNote.created).format('l LT')
  }

  return (
    <>
      <div className={`notes-list-view ${showNotes ? "show" : ""}`}>
        <div className='notes-container'>
          <div className='notes-sidebar'>
            <div className='notes-search'>
              <FiSearch color='#fff' className='note-search-icon' size={13} />
              <input className='note-search-input' placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className='notes-list'>
              {
                filteredNotes.map((note, index) => (
                  <div className={`note-item ${selectedNoteId && note.id === selectedNoteId ? 'selected' : ''}`} key={index} onClick={() => setSelectedNoteId(note.id)}>
                    <input className='note-title' value={note.name} onFocus={() => setSelectedNoteId(note.id)} onChange={(e) => handleChangeNote('name', e.target.value)} />
                    <p className='note-detail'>{getTime(note.created)} {note.details}</p>
                  </div>
                ))
              }
            </div>
          </div>
          <div className='notes-main'>
            <div className='notes-toolbar'>
              {
                selectedNote && (
                  <div className='note-time'>{getNoteTime(selectedNote)}</div>
                )
              }
              <FiPlus color='#fff' size={16} className="notes-tool-icon" onClick={handleAddNote} />
              <FiTrash2 color='#fff' className='ms-2 notes-tool-icon' size={16} onClick={handleDeleteNote} />
            </div>
            <div className='notes-content'>
              {
                selectedNoteId && selectedNote && (
                  <>
                    <textarea className='note-editor' ref={detailEditor} placeholder='New Note...' value={getDetail(selectedNote)} onChange={(e) => handleChangeNote('details', e.target.value)}></textarea>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <button className="btn-note" onClick={() => setShowNotes(!showNotes)}>Notes</button>
    </>
  )
}

export default Notes;