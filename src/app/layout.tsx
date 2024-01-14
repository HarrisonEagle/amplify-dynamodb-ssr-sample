"use client";
import "@aws-amplify/ui-react/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";
import { Amplify } from "aws-amplify";
import awsmobile from "../aws-exports";
import { parseAmplifyConfig } from "aws-amplify/utils";
import { Authenticator } from "@aws-amplify/ui-react";
import { ChakraProvider } from "@chakra-ui/react";
import { NavBar } from "@/components";
import { Hub } from "aws-amplify/utils";

Hub.listen("auth", ({ payload }) => {
  // TODO: refactor
  if (payload.event === "signedIn") {
    location.reload();
  }
});

export const amplifyConfig = parseAmplifyConfig(awsmobile);

const inter = Inter({ subsets: ["latin"] });

Amplify.configure(amplifyConfig, { ssr: true });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Authenticator>
          <ChakraProvider cssVarsRoot="body">
            <NavBar />
            {children}
          </ChakraProvider>
        </Authenticator>
      </body>
    </html>
  );
}
