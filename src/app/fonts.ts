import { Geist_Mono, Work_Sans } from "next/font/google";

export const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

// The canvas redesign's nav bio and oval links are Geist Mono (the rest of
// the site's mono text stays Fira Mono via --font-mono).
export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
