import { AgeActivities } from "@/components/AgeActivities";
import { CareerIcon } from "@/components/CareerIcon";
import type { Career } from "@/lib/careers";

export function CareerModule({ career }: { career: Career }) {
  return (
    <article className="module" id={career.id} style={{ ["--accent" as string]: career.accent }}>
      <div className="module-banner" style={{ background: career.accent }}>
        <CareerIcon id={career.id} title={career.name} />
        <div>
          <p className="kicker">Career module</p>
          <h2>{career.name}</h2>
        </div>
      </div>
      <div className="module-body">
        <div className="panel-box">
          <h3>What this job is</h3>
          <p>{career.overview}</p>
          <p>{career.impact}</p>
        </div>
        <div className="day-box">
          <h3>A typical day</h3>
          <ul>
            {career.dayToDay.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="roadmap">
          <h3>Education roadmap</h3>
          <p className="muted">{career.credentialNote}</p>
          <ol>
            {career.roadmap.map((step, index) => (
              <li key={step.label}>
                <span className="step-num">{index + 1}</span>
                <strong>{step.label}</strong>
                <p className="muted">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
        <AgeActivities items={career.tryNow} />
        <div className="sources">
          <h3>Sources for mentor review</h3>
          <p className="muted">
            These pages were used to check education steps. They are written for adults and may use
            harder words.
          </p>
          <ul>
            {career.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} rel="noopener noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
