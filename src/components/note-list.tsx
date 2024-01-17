import { NoteCard } from "@/components/note-card";
import { NoteController } from "@/controllers/note";
import { Note } from "@/entities";

type Props = {
  notes: Note[];
  onUpdate: (note: Note) => void;
  noteController: NoteController
};

export const NoteList = ({ notes, onUpdate, noteController }: Props) => {
  return notes.map((note) => (
    <NoteCard key={note.note_id} note={note} onUpdate={onUpdate} noteController={noteController}  />
  ));
};
