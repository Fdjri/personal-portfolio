import type { Metadata } from "next";
import "./globals.css";
import RibbonsWrapper from "@/components/RibbonsWrapper";

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
        <RibbonsWrapper 
          colors={['#06b6d4', '#2563eb', '#ffffff']} 
          baseThickness={20}
          speedMultiplier={0.5}
        />
        {children}
      </body>
    </html>
  );
}