import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { INote } from "../../types/NoteTypes";

// Define a type for the slice state
interface NoteState {
  notes: INote[];
}

// Define the initial state using that type
const initialState: NoteState = {
  notes: [],
};

interface EditPayload {
  note: INote;
  id: number;
}

export const noteSlice = createSlice({
  name: "note",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<INote[]>) => {
      state.notes = [...action.payload];
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload)
      state.notes.splice(index, 1)
    },
    addNote: (state, action: PayloadAction<INote>) => {
      state.notes.push({ ...action.payload, id: state.notes.length + 1 })
    },
    editNote: (state, action: PayloadAction<EditPayload>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id)
      state.notes[index] = { ...action.payload.note }
    }
  },
});

export const { setNotes, deleteNote, addNote, editNote } = noteSlice.actions;

export default noteSlice.reducer;
