"use client";

import { useState } from "react";
import type { NavLink } from "../../lib/landingConfig";

interface MobileMenuProps {
  links: NavLink[];
  ctaText?: string;
  ctaLink?: string;
}

export default function MobileMenu({
  links,
  ctaText = "Sign In",
  ctaLink = "#",
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-container transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="material-symbols-outlined text-on-surface" aria-hidden="true">
          {open ? "close" : "menu"}
        </span>
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="md:hidden absolute top-full left-0 right-0 bg-surface border-b border-outline-variant shadow-lg z-40"
        >
          <nav className="flex flex-col px-6 py-4 gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-label-md py-3 px-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-outline-variant mt-2">
              <a
                href={ctaLink}
                className="block w-full text-center text-label-md px-6 py-3 rounded-lg bg-primary text-on-primary hover:opacity-90 transition-opacity"
                onClick={() => setOpen(false)}
              >
                {ctaText}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
