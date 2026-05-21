import type { LandingPageConfig } from "../../lib/landingConfig";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  config: LandingPageConfig;
}

export default function Navbar({ config }: NavbarProps) {
  const { logoText = "Brand", logoImage, nav } = config;
  const links = nav?.links ?? [];
  const ctaText = nav?.ctaText ?? "Sign In";
  const ctaLink = nav?.ctaLink ?? "#";

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant">
      <div className="relative flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0" aria-label="Homepage">
          {logoImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoImage} alt={logoText} className="h-8 w-auto" />
          ) : (
            <span className="text-h2 font-bold text-primary">{logoText}</span>
          )}
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={ctaLink}
            className="text-label-md px-6 py-2.5 rounded-lg bg-primary text-on-primary hover:opacity-90 transition-opacity"
          >
            {ctaText}
          </a>
        </div>

        {/* Mobile menu toggle */}
        <MobileMenu links={links} ctaText={ctaText} ctaLink={ctaLink} />
      </div>
    </header>
  );
}
