import type {
  Metadata,
} from "next";

import "./globals.css";

import SessionProviderWrapper
from "@/components/SessionProviderWrapper";

import {
  Toaster,
} from "sonner";

export const metadata:
Metadata = {

  title:
    "Class Management",

  description:
    "Class Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en">

      <body>

        <SessionProviderWrapper>

          {children}

          <Toaster
            position="top-right"
            richColors
          />

        </SessionProviderWrapper>

      </body>

    </html>
  );
}