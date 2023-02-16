import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
  // active: {
  //   id: 'ABC123',
  //   title: '',
  //   body: '',
  //   dates: 123345,
  //   imageUrls: [],
  // },
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
    },

    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },

    setActiveNote: (state, action) => {
      state.active = action.payload
      state.messageSaved = ''
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },

    setSaving: (state, action) => {
      state.isSaving = true
    },

    updateNote: (state, action) => {
      state.isSaving = false
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload
        }

        return note
      })

      state.messageSaved = `${action.payload.title}, updated correctly`
    },

    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
      state.isSaving = false
    },

    clearNotesLogout: (state) => {
      state.isSaving = false
      state.messageSaved = ''
      state.notes = []
      state.active = null
    },

    deleteNoteById: (state, action) => {
      state.active = null
      state.notes = state.notes.filter((note) => note.id !== action.payload)
    },
  },
})

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions