"use client";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Poppins, Josefin_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadeUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
import socketIo from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
import { useEffect } from 'react';
import Chatbot from "./components/Chatbot/Chatbot";
const socketId = socketIo(ENDPOINT,{
  transports: ["websocket"],});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${poppins.variable} ${josefin.variable} bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Custom>
              {children}
              </Custom>
              <Chatbot/>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom : React.FC<{children: React.ReactNode}> =
  ({children}) => {
    const {isLoading} = useLoadeUserQuery({});

    useEffect(() => {
      socketId.on("connection", () => {
        console.log("connected");
      })
    }, [socketId])
    
    return (
      <>
        {
          isLoading ? <Loader/> : <>{children}</>
        }
      </>
    )
  }
