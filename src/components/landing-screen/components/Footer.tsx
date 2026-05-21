import type { LandingPageConfig } from "../../lib/landingConfig";

interface FooterProps {
  config: LandingPageConfig;
}

export default function Footer({ config }: FooterProps) {
  const footer = config.footer ?? {};
  const {
    brandName = config.logoText ?? "Brand",
    tagline,
    copyright = `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`,
    links = [],
    socialLinks = [],
    contact,
  } = footer;

  return (
    <footer className="w-full bg-surface border-t border-outline-variant mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <span className="text-h3 font-bold text-on-surface">{brandName}</span>
            {tagline && (
              <p className="text-body-sm text-on-surface-variant">{tagline}</p>
            )}
            {contact?.email && (
              <a
                href={`mailto:${contact.email}`}
                className="text-label-md text-primary hover:underline mt-1"
              >
                {contact.email}
              </a>
            )}
            {contact?.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="text-label-md text-on-surface-variant hover:text-on-surface"
              >
                {contact.phone}
              </a>
            )}
          </div>

          {/* Nav links */}
          {links.length > 0 && (
            <nav aria-label="Footer navigation">
              <p className="text-label-caps text-on-surface-variant mb-4">
                Legal
              </p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Social links */}
          {socialLinks.length > 0 && (
            <nav aria-label="Social media links">
              <p className="text-label-caps text-on-surface-variant mb-4">
                Follow us
              </p>
              <ul className="flex flex-col gap-2">
                {socialLinks.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.href}
                      className="flex items-center gap-2 text-label-md text-on-surface-variant hover:text-primary transition-colors group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.icon && (
                        <span
                          className="material-symbols-outlined text-base text-outline group-hover:text-primary transition-colors"
                          aria-hidden="true"
                        >
                          {s.icon}
                        </span>
                      )}
                      {s.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-outline-variant">
          <p className="text-body-sm text-on-surface-variant text-center md:text-left">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
