import { NoteClient } from "@/components/note-client";
// import all server actions at here to avoid webpack build error
import { getNoteController } from "@/controllers/note";

export default async function Home() {
  const noteController = getNoteController();
  const notes = await noteController.getNotes();
  return <NoteClient notes={notes} noteController={noteController} />
}
