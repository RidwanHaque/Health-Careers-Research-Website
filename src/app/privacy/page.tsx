import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "What Health Careers Explorer collects, why, and what it does not collect.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="wrap">
        <article className="simple-page">
          <h1>Privacy notice</h1>
          <p>
            Health Careers Explorer is a student educational project. It is not an official PCOM
            service and does not use advertising trackers.
          </p>
          <h2>What you can use without sharing personal data</h2>
          <p>
            You can read every career module without creating an account. The optional poll stores an
            anonymous vote count plus a cookie on your device so the same browser cannot vote twice.
          </p>
          <h2>What we collect if you use a form</h2>
          <ul>
            <li>
              <strong>Questions:</strong> the question text, optional name or nickname, the related
              career, an age band, and a reply email. If the visitor is under 13, only a parent or
              guardian email should be submitted.
            </li>
            <li>
              <strong>Opportunity list:</strong> an email address and whether you are a parent,
              teacher, or student 13 or older. Children under 13 should not be signed up.
            </li>
          </ul>
          <p>
            Forms are saved on the server that hosts this site so the author can reply. This project
            does not currently send automatic emails, newsletters, or text messages.
          </p>
          <h2>Cookies</h2>
          <p>
            A poll cookie remembers that you voted. An admin cookie is set only after a successful
            staff login. Both cookies are httpOnly and are not used for advertising.
          </p>
          <h2>What we do not do</h2>
          <ul>
            <li>No third-party analytics scripts are installed on this site today</li>
            <li>No sale of personal information</li>
            <li>No medical advice, diagnosis, or treatment</li>
            <li>No file uploads</li>
          </ul>
          <p>
            To ask that a saved email or question be deleted, use the question form from a parent or
            adult email and say you want the record removed.
          </p>
          <p>
            <Link href="/">Back to the explorer</Link>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
