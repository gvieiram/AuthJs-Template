import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AuthJS Template",
  description: "AuthJS Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`antialiased dark`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
