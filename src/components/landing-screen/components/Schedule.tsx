import type { LandingPageConfig, ScheduleItem } from "../../lib/landingConfig";

interface ScheduleProps {
  config: LandingPageConfig;
}

const dotColors: Record<NonNullable<ScheduleItem["variant"]>, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  default: "bg-outline-variant",
};

const labelColors: Record<NonNullable<ScheduleItem["variant"]>, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  default: "text-on-surface-variant",
};

export default function Schedule({ config }: ScheduleProps) {
  const items = config.schedule ?? [];

  if (items.length === 0) return null;

  return (
    <section
      id="schedule"
      aria-labelledby="schedule-heading"
      className="py-24 px-6 bg-surface-container-low"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-label-caps text-primary mb-3">Event timeline</p>
          <h2 id="schedule-heading" className="text-h1 text-on-surface">
            The 48-Hour Sprint
          </h2>
        </div>

        {/* Timeline */}
        <ol
          className="relative border-l border-outline-variant ml-4 space-y-14"
          aria-label="Event schedule"
        >
          {items.map((item) => {
            const variant = item.variant ?? "default";
            return (
              <li key={item.id} className="relative pl-8">
                {/* Timeline dot */}
                <div
                  className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${dotColors[variant]}`}
                  aria-hidden="true"
                />

                <div>
                  {/* Date & time label */}
                  {(item.dayLabel || item.time) && (
                    <p
                      className={`text-label-caps mb-2 ${labelColors[variant]}`}
                    >
                      {[item.dayLabel, item.time].filter(Boolean).join(" · ")}
                    </p>
                  )}

                  <h3 className="text-h3 text-on-surface mb-2">{item.title}</h3>

                  {item.description && (
                    <p className="text-body-md text-on-surface-variant leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
