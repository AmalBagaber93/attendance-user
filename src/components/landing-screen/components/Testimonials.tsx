import type { LandingPageConfig } from "../../lib/landingConfig";

interface TestimonialsProps {
  config: LandingPageConfig;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Testimonials({ config }: TestimonialsProps) {
  const testimonials = config.testimonials ?? [];

  if (testimonials.length === 0) return null;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-24 px-6 bg-surface"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-label-caps text-primary mb-3">Testimonials</p>
          <h2 id="testimonials-heading" className="text-h1 text-on-surface">
            Builders love InnovateX
          </h2>
        </div>

        {/* Cards */}
        <ul
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          role="list"
          aria-label="Testimonials"
        >
          {testimonials.map((t, i) => (
            <li
              key={t.id}
              className={`clean-card rounded-xl p-6 flex flex-col gap-4 animate-fade-in-up`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Quote */}
              <blockquote>
                <span
                  className="material-symbols-outlined text-3xl text-primary-fixed-dim mb-2 block"
                  aria-hidden="true"
                >
                  format_quote
                </span>
                <p className="text-body-md text-on-surface-variant leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <footer className="flex items-center gap-3 mt-auto pt-4 border-t border-outline-variant">
                {t.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <span className="text-label-md text-primary font-bold">
                      {initials(t.name)}
                    </span>
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-body-sm font-semibold text-on-surface truncate">
                    {t.name}
                  </p>
                  {(t.role || t.company) && (
                    <p className="text-label-md text-on-surface-variant truncate">
                      {[t.role, t.company].filter(Boolean).join(", ")}
                    </p>
                  )}
                </div>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
