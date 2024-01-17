"use client";
import "@aws-amplify/ui-react/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";
import { Amplify } from "aws-amplify";
import awsmobile from "../aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { NavBar } from "@/components/nav-bar";
import { CookieStorage, parseAmplifyConfig } from "aws-amplify/utils";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";

const inter = Inter({ subsets: ["latin"] });
const amplifyConfig = parseAmplifyConfig(awsmobile);

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());
Amplify.configure(amplifyConfig, { ssr: true });

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <ChakraProvider cssVarsRoot="body" theme={theme}>
          <Authenticator.Provider>
            <NavBar />
            {children}
          </Authenticator.Provider>
        </ChakraProvider>
      </body>
    </html>
  );
}
