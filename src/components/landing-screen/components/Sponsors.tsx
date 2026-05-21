import type { LandingPageConfig } from "../../lib/landingConfig";
import ImageWithFallback from "./ImageWithFallback";

interface SponsorsProps {
  config: LandingPageConfig;
}

const TIER_ORDER = ["platinum", "gold", "silver", "bronze"] as const;
type Tier = (typeof TIER_ORDER)[number];

const TIER_LABELS: Record<Tier, string> = {
  platinum: "Platinum Sponsors",
  gold: "Gold Sponsors",
  silver: "Silver Sponsors",
  bronze: "Bronze Sponsors",
};

const TIER_LOGO_SIZE: Record<Tier, string> = {
  platinum: "h-16",
  gold: "h-12",
  silver: "h-10",
  bronze: "h-8",
};

export default function Sponsors({ config }: SponsorsProps) {
  const sponsors = config.sponsors ?? [];

  if (sponsors.length === 0) return null;

  const grouped = TIER_ORDER.reduce<Record<Tier, typeof sponsors>>(
    (acc, tier) => {
      acc[tier] = sponsors.filter((s) => s.tier === tier);
      return acc;
    },
    { platinum: [], gold: [], silver: [], bronze: [] }
  );

  const activeTiers = TIER_ORDER.filter((t) => grouped[t].length > 0);

  return (
    <section
      id="sponsors"
      aria-labelledby="sponsors-heading"
      className="py-24 px-6 bg-surface"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-label-caps text-primary mb-3">Our Partners</p>
          <h2 id="sponsors-heading" className="text-h1 text-on-surface">
            Sponsors
          </h2>
        </div>

        <div className="flex flex-col gap-16">
          {activeTiers.map((tier) => (
            <div key={tier}>
              <p className="text-label-caps text-on-surface-variant text-center mb-8">
                {TIER_LABELS[tier]}
              </p>
              <ul
                className="flex flex-wrap justify-center items-center gap-8"
                role="list"
              >
                {grouped[tier].map((sponsor, i) => (
                  <li
                    key={sponsor.id}
                    className="clean-card rounded-xl p-6 flex flex-col items-center gap-3 animate-fade-in-up min-w-[140px]"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {sponsor.logo ? (
                      <ImageWithFallback
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className={`${TIER_LOGO_SIZE[tier]} w-auto object-contain`}
                        placeholderIcon="business"
                      />
                    ) : (
                      <div
                        className={`${TIER_LOGO_SIZE[tier]} flex items-center justify-center`}
                        aria-hidden="true"
                      >
                        <span className="material-symbols-outlined text-4xl text-primary">
                          business
                        </span>
                      </div>
                    )}
                    <span className="text-label-md text-on-surface-variant text-center">
                      {sponsor.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
