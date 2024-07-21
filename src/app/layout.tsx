import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/shared/lib/utils";

import "./globals.css";

import { Header } from "@/widgets/header";
import { ThemeProvider } from "@/components/theme-provider";
import { CodeLangProvider } from "@/shared/contexts/code-lang";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Algo circuit",
  description: "Algorithm visualizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          fontSans.className,
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CodeLangProvider>
            <Header />
            <div className="grow shadow-md">{children}</div>
            <footer className=" p-4 text-center text-sm text-gray-500">
              All rights reserved © Artem Makatera 2024
            </footer>
          </CodeLangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
