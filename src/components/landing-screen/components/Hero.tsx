
import { LandingPageConfig } from "@/src/lib/landingConfig";
import ImageWithFallback from "./ImageWithFallback";

interface HeroProps {
  config: LandingPageConfig;
}

export default function Hero({ config }: HeroProps) {
  const hero = config.hero ?? {};
  const {
    badge,
    title = "Welcome to the Future.",
    titleHighlight,
    subtitle = "Something amazing is coming.",
    ctaText = "Get Started",
    ctaLink = "#",
    secondaryCtaText,
    secondaryCtaLink = "#",
    image,
    imageAlt = "Hero image",
    location,
  } = hero;

  const headline = titleHighlight
    ? `${title} ${titleHighlight}`
    : title;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 bg-surface overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center animate-fade-in-up">
        {/* Badge */}
        {badge && (
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-label-caps mb-6">
            <span className="material-symbols-outlined text-base" aria-hidden="true">
              event
            </span>
            {badge}
          </span>
        )}

        {/* Headline */}
        <h1
          id="hero-heading"
          className="text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mb-6 max-w-3xl"
        >
          {title}{" "}
          {titleHighlight && (
            <span className="text-primary">{titleHighlight}</span>
          )}
          {!titleHighlight && headline}
        </h1>

        {/* Subtitle */}
        <p className="text-body-lg text-on-surface-variant mb-10 max-w-2xl">
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animation-delay-200 animate-fade-in-up">
          <a
            href={ctaLink}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-on-primary text-h3 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            {ctaText}
          </a>
          {secondaryCtaText && (
            <a
              href={secondaryCtaLink}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-outline-variant text-on-surface text-h3 hover:bg-surface-container-low hover:border-outline transition-all duration-200"
            >
              {secondaryCtaText}
            </a>
          )}
        </div>

        {/* Location */}
        {location && (
          <div className="flex items-center gap-2 mt-8 text-body-md text-on-surface-variant opacity-70">
            <span className="material-symbols-outlined text-base" aria-hidden="true">
              location_on
            </span>
            <span>{location}</span>
          </div>
        )}
      </div>

      {/* Hero image */}
      <div className="relative z-10 mt-16 w-full max-w-5xl px-0 animation-delay-300 animate-fade-in">
        <ImageWithFallback
          src={image}
          alt={imageAlt}
          className="w-full h-64 sm:h-96 md:h-[500px] object-cover rounded-2xl shadow-sm border border-outline-variant"
          placeholderClassName="w-full h-64 sm:h-96 md:h-[500px] rounded-2xl border border-outline-variant"
        />
      </div>
    </section>
  );
}
