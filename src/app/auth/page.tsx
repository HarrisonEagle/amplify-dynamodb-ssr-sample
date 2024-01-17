"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { Center } from "@chakra-ui/react";
import { Hub } from "aws-amplify/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    Hub.listen("auth", ({ payload }) => {
      if (payload.event == "signedIn") {
        console.log("loggedin");
        router.replace("/");
      }
    });
  }, []);

  return (
    <Center h='calc(80vh)'>
      <Authenticator />
    </Center>
  );
}
