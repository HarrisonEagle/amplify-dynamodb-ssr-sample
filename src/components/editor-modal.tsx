"use client";
import { NoteController } from "@/controllers/note";
import { Note } from "@/entities";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type Props = {
  edittingNote?: Note;
  isOpen: boolean;
  onClose: () => void;
  noteController: NoteController
};

export const EditorModal = ({ edittingNote, isOpen, onClose, noteController }: Props) => {
  const formAction = async (formData: FormData) => {
    await noteController.putNote(formData);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <form action={formAction}>
            <ModalBody>
              <input
                hidden
                readOnly
                name="note_id"
                value={edittingNote ? edittingNote.note_id : ""}
              />
              <FormControl>
                <FormLabel>Note name</FormLabel>
                <Input
                  name="note_name"
                  placeholder="note name"
                  defaultValue={edittingNote ? edittingNote.note_name : ""}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Note content</FormLabel>
                <Input
                  name="note_content"
                  placeholder="note content"
                  defaultValue={edittingNote ? edittingNote.note_content : ""}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue">
                Send
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
