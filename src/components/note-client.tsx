"use client";
import { EditorModal, NoteList } from "@/components";
import { Note } from "@/entities";
import { Button, HStack, VStack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  notes: Note[];
  putNote: (data: FormData) => Promise<void>;
  deleteNote: (data: FormData) => Promise<void>;
};
export const NoteClient = ({ notes, putNote, deleteNote }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [edittingNote, setEdittingNote] = useState<Note | undefined>();

  const onUpdate = (note: Note) => {
    setEdittingNote(note);
    onOpen();
  };

  return (
    <VStack mt={3}>
      <HStack w="lg">
        <Button onClick={onOpen}>Add Note</Button>
        <EditorModal
          edittingNote={edittingNote}
          isOpen={isOpen}
          onClose={onClose}
          putNote={putNote}
        />
      </HStack>
      <div>
        <NoteList notes={notes} onUpdate={onUpdate} deleteNote={deleteNote} />
      </div>
    </VStack>
  );
};
