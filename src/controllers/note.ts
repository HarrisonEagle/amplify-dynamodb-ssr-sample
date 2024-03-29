import { Note } from "@/entities";
import { getNotes, putNote, deleteNote } from "../services/note";

export type NoteController = {
    getNotes: () => Promise<Note[]>
    putNote: (data: FormData) => Promise<void>
    deleteNote: (data: FormData) => Promise<void>
}

export const noteController: NoteController = {
  getNotes: getNotes,
  putNote: putNote,
  deleteNote: deleteNote
}