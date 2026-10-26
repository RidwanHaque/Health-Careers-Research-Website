import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const display = Fredoka({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  weight: ["500", "600", "700"],
});

const body = Nunito({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  weight: ["400", "700", "800"],
});

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Health Careers Explorer",
    template: "%s · Health Careers Explorer",
  },
  description:
    "A kid-friendly guide to health jobs. Learn what physicians, PAs, nurses, physical therapists, pharmacists, educators, and researchers do, and what you can try now.",
  openGraph: {
    title: "Health Careers Explorer",
    description:
      "Explore health careers with simple overviews, education roadmaps, and age-by-age next steps.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
