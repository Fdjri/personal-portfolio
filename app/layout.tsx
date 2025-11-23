import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sholihul Fadjri Triwibowo",
  description: "Personal portfolio website of Sholihul Fadjri Triwibowo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-[#020205] text-white"
        style={{
          fontFamily: '"Lucida Sans Typewriter", "Lucida Console", "Monaco", "Bitstream Vera Sans Mono", monospace'
        }}
      >
        {children}
      </body>
    </html>
  );
}