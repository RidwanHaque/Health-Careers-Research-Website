import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="wrap">
        <article className="simple-page">
          <h1>That page is not on this map</h1>
          <p>
            Health Careers Explorer is mostly one long page. The link you used does not match a page
            that exists.
          </p>
          <p>
            <Link className="button-link" href="/">
              Go back to the careers
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
