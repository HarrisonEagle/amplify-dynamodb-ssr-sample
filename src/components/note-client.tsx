"use client";
import { EditorModal, NoteList } from "@/components";
import { Note } from "@/entities";
import { Button, HStack, VStack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export const NoteClient = ({ notes }: { notes: Note[] }) => {
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
        />
      </HStack>
      <div>
        <NoteList notes={notes} onUpdate={onUpdate} />
      </div>
    </VStack>
  );
};
