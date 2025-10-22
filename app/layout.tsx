import type { Metadata } from "next";
import "./globals.css";
import TerminalNav from "@/components/TerminalNav";

export const metadata: Metadata = {
  title: "DeepFabric - Micro Agent Training Pipeline",
  description: "Build agents that do what you want, how you want.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mono antialiased relative">
        {/* Scanline effect overlay */}
        <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-30" />

        {/* CRT glow effect */}
        <div className="crt-glow fixed inset-0 pointer-events-none" />

        {/* Terminal Navigation */}
        <TerminalNav />

        <main className="relative z-10 min-h-screen pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
