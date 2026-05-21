"use client";

import { useState } from "react";

interface ImageWithFallbackProps {
  src?: string;
  alt?: string;
  className?: string;
  placeholderClassName?: string;
  placeholderIcon?: string;
}

export default function ImageWithFallback({
  src,
  alt = "",
  className = "",
  placeholderClassName = "",
  placeholderIcon = "image",
}: ImageWithFallbackProps) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div
        className={`flex items-center justify-center bg-surface-container ${placeholderClassName || className}`}
        role="img"
        aria-label={alt || "Image placeholder"}
      >
        <span
          className="material-symbols-outlined text-5xl text-outline opacity-30"
          aria-hidden="true"
        >
          {placeholderIcon}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}
