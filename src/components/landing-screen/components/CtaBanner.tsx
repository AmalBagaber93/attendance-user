import type { LandingPageConfig } from "../../lib/landingConfig";

interface CtaBannerProps {
  config: LandingPageConfig;
}

export default function CtaBanner({ config }: CtaBannerProps) {
  const cta = config.cta ?? {};
  const {
    title = "Ready to Build the Future?",
    subtitle,
    buttonText = "Get Started",
    buttonLink = "#",
    secondaryText,
    secondaryLink = "#",
  } = cta;

  return (
    <section
      id="registration"
      aria-labelledby="cta-heading"
      className="py-24 px-6 bg-surface-container-low"
    >
      <div className="max-w-4xl mx-auto rounded-3xl bg-inverse-surface py-20 px-8 text-center animate-fade-in-up">
        <h2
          id="cta-heading"
          className="text-h1 text-on-primary mb-4"
        >
          {title}
        </h2>

        {subtitle && (
          <p className="text-body-lg text-inverse-on-surface opacity-75 mb-10 max-w-xl mx-auto">
            {subtitle}
          </p>
        )}

        <div className="flex flex-col items-center gap-4">
          <a
            href={buttonLink}
            className="px-10 py-4 rounded-xl bg-primary text-on-primary text-h3 hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 min-w-52 text-center"
          >
            {buttonText}
          </a>
          {secondaryText && (
            <a
              href={secondaryLink}
              className="text-on-primary text-label-md opacity-60 hover:opacity-90 hover:underline transition-opacity"
            >
              {secondaryText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
