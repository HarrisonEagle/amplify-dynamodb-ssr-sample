import { NoteClient } from "@/components/note-client"; 
import { noteController } from "@/controllers/note";
// import all server actions at here to avoid webpack build error

export default async function Home() {
  const notes = await noteController.getNotes();
  return <NoteClient notes={notes} />
}
