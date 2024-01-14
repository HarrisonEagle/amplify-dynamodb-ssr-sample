import { NoteCard } from "@/components/note-card";
import { Note } from "@/entities";

type Props = { notes: Note[]; onUpdate: (note: Note) => void };

export const NoteList = ({ notes, onUpdate }: Props) => {
  return notes.map((note) => (
    <NoteCard key={note.note_id} note={note} onUpdate={onUpdate} />
  ));
};
