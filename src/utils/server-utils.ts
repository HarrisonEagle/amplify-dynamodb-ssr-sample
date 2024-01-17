"use server";
import awsmobile from "../aws-exports";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { cookies } from "next/headers";

const { runWithAmplifyServerContext } = createServerRunner({
  config: awsmobile,
});

const getCurrentSessionFromServer = async () =>
  await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => fetchAuthSession(contextSpec),
  });

export const getCurrentUserFromServer = async () =>
  await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => getCurrentUser(contextSpec),
  });

export const getDynamoDBClient = async () => {
  const session = await getCurrentSessionFromServer();
  return await new DynamoDBClient({
    credentials: session.credentials,
    region: "ap-northeast-1",
  });
};
