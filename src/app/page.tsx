import { NoteClient } from "@/components";
import { getNotes, putNote, deleteNote } from "@/controllers"; // import all server actions at here to avoid webpack build error

export default async function Home() {
  const notes = await getNotes();
  return <NoteClient notes={notes} putNote={putNote} deleteNote={deleteNote} />;
}
