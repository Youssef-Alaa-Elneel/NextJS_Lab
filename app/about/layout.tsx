import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";

const links = [
  {
    name: "Mission",
    path: "/about/mission",
  },
  {
    name: "Vision",
    path: "/about/vision",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <nav className="bg-green-600 text-white p-4 space-x-4 ">
          {links.map((link) => (
            <Link href={link.path}>{link.name}</Link>
          ))}
        </nav>
        {children}
      </body>
    </html>
  );
}
