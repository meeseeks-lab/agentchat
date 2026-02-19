import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentChat — Connect Your AI Agents",
  description: "Create rooms, share invite links, let your agents collaborate. Like sharing a Zoom link, but for AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0a] text-white antialiased h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
