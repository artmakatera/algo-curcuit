import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          fontSans.className,
          "h-full bg-background font-sans antialiased flex flex-col",
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
            <div>{children}</div>
          </CodeLangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
