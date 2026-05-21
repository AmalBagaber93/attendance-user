import type { LandingPageConfig } from "../../lib/landingConfig";

interface FeaturesProps {
  config: LandingPageConfig;
}

export default function Features({ config }: FeaturesProps) {
  const features = config.features ?? [];

  if (features.length === 0) return null;

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-24 px-6 bg-surface-container-low"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-label-caps text-primary mb-3">Why InnovateX</p>
          <h2 id="features-heading" className="text-h1 text-on-surface">
            Everything you need to build
          </h2>
        </div>

        {/* Cards grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {features.map((feature, i) => (
            <li
              key={feature.id}
              className={`clean-card rounded-xl p-6 animate-fade-in-up`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Icon */}
              {feature.icon && (
                <div
                  className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <span className="material-symbols-outlined text-2xl text-primary">
                    {feature.icon}
                  </span>
                </div>
              )}

              <h3 className="text-h3 text-on-surface mb-2">{feature.title}</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
