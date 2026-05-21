import { LandingPageConfig } from "../../../lib/landingConfig";


interface AboutProps {
  config: LandingPageConfig;
}

export default function About({ config }: AboutProps) {
  const about = config.about;
  if (!about) return null;

  const {
    title = "About Us",
    body,
    stats = [],
  } = about;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 px-6 bg-surface"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Content */}
        <div className="animate-fade-in-up">
          <p className="text-label-caps text-secondary mb-3">Our story</p>
          <h2 id="about-heading" className="text-h1 text-on-surface mb-6">
            {title}
          </h2>
          {body && (
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              {body}
            </p>
          )}
        </div>

        {/* Stats grid */}
        {stats.length > 0 && (
          <div
            className="grid grid-cols-2 gap-4 animate-fade-in-up animation-delay-200"
            aria-label="Key statistics"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="clean-card rounded-xl p-6 flex flex-col gap-1"
              >
                <span className="text-display-lg-mobile text-primary font-bold leading-none">
                  {stat.value}
                </span>
                <span className="text-label-md text-on-surface-variant">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
