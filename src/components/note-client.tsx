"use client";
import { EditorModal } from "@/components/editor-modal";
import { NoteList } from "@/components/note-list";
import { NoteController } from "@/controllers/note";
import { Note } from "@/entities";
import { Button, HStack, VStack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  notes: Note[];
  noteController: NoteController
};
export const NoteClient = ({ notes, noteController }: Props) => {
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
          noteController={noteController}
        />
      </HStack>
      <div>
        <NoteList notes={notes} onUpdate={onUpdate} noteController={noteController} />
      </div>
    </VStack>
  );
};
