import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panchajanya — 25 Years of Trust & Quality | Premium Manufacturing",
  description:
    "Panchajanya is a pioneering manufacturer and marketer of animal feed supplements, cleaning products, livestock solutions and packaging products. 25 years of trust & quality.",
  keywords:
    "panchajanya, animal feed supplements, livestock solutions, cleaning products, packaging, manufacturing, panchajanya group",
  openGraph: {
    title: "Panchajanya — 25 Years of Trust & Quality",
    description:
      "Pioneering manufacturer and marketer of animal feed supplements, cleaning products, livestock solutions and packaging products.",
    type: "website",
    url: "https://www.panchajanyagroup.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
