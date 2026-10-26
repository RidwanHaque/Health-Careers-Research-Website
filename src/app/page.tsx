import { CareerModule } from "@/components/CareerModule";
import { ExploreTools } from "@/components/ExploreTools";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { careers } from "@/lib/careers";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="wrap">
        <section className="hero" aria-labelledby="welcome-title">
          <div>
            <p className="kicker">Welcome</p>
            <h1 id="welcome-title">Meet people who keep others healthy.</h1>
            <p>
              This page is a simple tour of health careers. You can jump to a job, read what a usual
              day looks like, see the school path, and pick one thing you can try at your age.
            </p>
            <p>
              Start with the colorful buttons at the top. Stay as long as you want. There is no quiz
              grade and no login for the lessons.
            </p>
            <ul className="howto">
              <li>1. Pick a career</li>
              <li>2. Read the day-to-day</li>
              <li>3. Follow the roadmap</li>
              <li>4. Try one idea now</li>
            </ul>
          </div>
          <div className="hero-art" aria-hidden="true">
            <p style={{ marginTop: 0, fontWeight: 800 }}>The explorer board</p>
            <div className="board">
              {["MD", "PA", "RN", "PT", "Rx", "ED", "Lab", "Go"].map((label, index) => (
                <span
                  key={label}
                  style={{
                    background: ["#e85d4c", "#f4a127", "#3dbb6b", "#5b8def", "#9b59b6", "#ef6c9c", "#2bb7c7", "#ffdf5a"][
                      index
                    ],
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
            <p>Seven jobs. Same map every time: overview, daily work, school steps, next action.</p>
          </div>
        </section>

        {careers.map((career) => (
          <CareerModule key={career.id} career={career} />
        ))}

        <ExploreTools />
      </main>
      <SiteFooter />
    </>
  );
}
