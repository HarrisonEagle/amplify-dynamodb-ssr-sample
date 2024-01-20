"use client";

import { noteController } from "@/controllers/note";
import { Note } from "@/entities";
import {
  Card,
  Heading,
  CardBody,
  Text,
  CardFooter,
  ButtonGroup,
  Button,
  Divider,
  Stack,
} from "@chakra-ui/react";

type Props = {
  onUpdate: (note: Note) => void;
  note: Note;
};

export const NoteCard = ({ note, onUpdate }: Props) => {
  const onUpdateClick = () => {
    onUpdate(note);
  };
  return (
    <Card mt="3" w="lg">
      <CardBody>
        <Stack mt="2" spacing="3">
          <Heading size="md">{note.note_name}</Heading>
          <Text>{note.note_content}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue" onClick={onUpdateClick}>
            Update
          </Button>
          <form action={noteController.deleteNote}>
            <input hidden readOnly name="note_id" value={note.note_id} />
            <Button type="submit" variant="ghost" colorScheme="red">
              Delete
            </Button>
          </form>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
