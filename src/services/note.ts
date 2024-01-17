"use server"
import { Note } from "@/entities";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUserFromServer, getDynamoDBClient } from "@/utils";
import {
  QueryCommand,
  QueryCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  DeleteItemCommand,
  DeleteItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { revalidatePath } from "next/cache";

const tableName = "test-table";

export const getNotes = async (): Promise<Note[]> => {
  const client = await getDynamoDBClient();
  const user = await getCurrentUserFromServer();
  const params: QueryCommandInput = {
    TableName: "test-table",
    IndexName: "user-index",
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": { S: user.userId },
    },
  };
  const result = await client.send(new QueryCommand(params));
  if (result.Items) {
    // TODO: refactor
    const notes: Note[] = result.Items.map((e) => ({
      note_id: e.note_id.S ?? "",
      note_name: e.note_name.S ?? "",
      note_content: e.note_content.S ?? "",
    }));
    return notes;
  }
  return [];
};

export const putNote = async (data: FormData) => {
  const note_name = data.get("note_name") as string;
  const note_content = data.get("note_content") as string;
  let note_id = data.get("note_id") as string;
  if (!note_id) {
    note_id = uuidv4();
  }
  const client = await getDynamoDBClient();
  const user = await getCurrentUserFromServer();
  const putItemRequest: PutItemCommandInput = {
    TableName: tableName,
    Item: {
      note_id: { S: note_id },
      user_id: { S: user.userId },
      note_name: { S: note_name },
      note_content: { S: note_content },
    },
  };
  await client.send(new PutItemCommand(putItemRequest));
  revalidatePath("/");
};

export const deleteNote = async (data: FormData) => {
  const note_id = data.get("note_id") as string;
  const client = await getDynamoDBClient();
  const user = await getCurrentUserFromServer();
  const deleteItemRequest: DeleteItemCommandInput = {
    TableName: tableName,
    Key: {
      note_id: { S: note_id },
      user_id: { S: user.userId },
    },
  };
  await client.send(new DeleteItemCommand(deleteItemRequest));
  revalidatePath("/");
};
