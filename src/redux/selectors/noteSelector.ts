import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const notes = (state: RootState) => state.notes;

export const getNotes = createSelector([notes], (notes) => notes);
export const getNote = (index: number) =>
  createSelector([notes], (notes) =>
    notes.notes[index]
  );
