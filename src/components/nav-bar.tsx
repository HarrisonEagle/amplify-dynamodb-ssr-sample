"use client";
import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { redirect, useRouter } from "next/navigation";

export const NavBar = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const router = useRouter()

  const onSignOut = () => {
    signOut()
    router.push("/auth")
  }

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Note App</Box>
          {user && (
            <Flex alignItems={"center"}>
              <Stack alignItems={"center"} direction={"row"} spacing={7}>
                <Text>Current User: {user.username}</Text>
                <Button onClick={onSignOut}>Log Out</Button>
              </Stack>
            </Flex>
          )}
        </Flex>
      </Box>
    </>
  );
};
