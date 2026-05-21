import type { LandingPageConfig } from "../../lib/landingConfig";
import ImageWithFallback from "./ImageWithFallback";

interface SpeakersProps {
  config: LandingPageConfig;
}

export default function Speakers({ config }: SpeakersProps) {
  const speakers = config.speakers ?? [];

  if (speakers.length === 0) return null;

  return (
    <section
      id="speakers"
      aria-labelledby="speakers-heading"
      className="py-24 px-6 bg-surface-container-low"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-label-caps text-primary mb-3">Meet the Experts</p>
          <h2 id="speakers-heading" className="text-h1 text-on-surface">
            Featured Speakers
          </h2>
        </div>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {speakers.map((speaker, i) => (
            <li
              key={speaker.id}
              className="clean-card rounded-xl p-6 animate-fade-in-up flex flex-col items-center text-center"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {speaker.avatar ? (
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                  <ImageWithFallback
                    src={speaker.avatar}
                    alt={speaker.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div
                  className="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <span className="material-symbols-outlined text-3xl text-primary">
                    person
                  </span>
                </div>
              )}

              <h3 className="text-h3 text-on-surface mb-1">{speaker.name}</h3>

              {(speaker.role || speaker.company) && (
                <p className="text-body-sm text-primary font-medium mb-3">
                  {[speaker.role, speaker.company].filter(Boolean).join(" · ")}
                </p>
              )}

              {speaker.bio && (
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  {speaker.bio}
                </p>
              )}

              {speaker.topic && (
                <span className="mt-4 inline-block px-3 py-1 rounded-full bg-primary-fixed text-primary text-sm font-medium">
                  {speaker.topic}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
