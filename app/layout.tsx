import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Sholihul Fadjri Triwibowo",
  description: "Personal portfolio website of Sholihul Fadjri Triwibowo",
  icons: {
    icon: '/images/me.jpg',
    shortcut: '/images/me.jpg',
    apple: '/images/me.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-[#020205] text-white cursor-none"
        style={{
          fontFamily: '"Lucida Sans Typewriter", "Lucida Console", "Monaco", "Bitstream Vera Sans Mono", monospace'
        }}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}