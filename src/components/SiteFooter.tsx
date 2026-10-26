import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <h2>About this site</h2>
          <p>
            Health Careers Explorer is a student-made introduction to health jobs for K–12 visitors.
            Educational content is written by Rayan Haque as an independent project connected to
            PCOM Georgia&apos;s Office of Campus and Community Partnerships.
          </p>
          <p className="muted">
            This is not an official PCOM website. Official logo use and mentor review of every module
            are still being confirmed with CCP staff. Nothing here is medical advice or an admissions
            promise.
          </p>
        </div>
        <div>
          <h2>Credits</h2>
          <p>Content and design direction: Rayan Haque</p>
          <p>Web development support: Ridwan Haque</p>
          <p>
            Career facts were checked against the U.S. Bureau of Labor Statistics Occupational Outlook
            Handbook and professional-association pages linked in each module.
          </p>
        </div>
        <div>
          <h2>Contact and policies</h2>
          <p>
            Questions about the project can be sent with the form on this page. Mentors can review
            saved questions in the private admin view after login.
          </p>
          <p>
            <Link href="/privacy">Privacy notice</Link>
            {" · "}
            <a href="https://www.pcom.edu/about/departments/community-partnerships/outreach.html" rel="noopener noreferrer">
              PCOM CCP outreach
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
