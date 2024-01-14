import { NoteClient } from "@/components";
import { getNotes } from "@/controllers";

export default async function Home() {
  const notes = await getNotes();
  return <NoteClient notes={notes} />;
}
