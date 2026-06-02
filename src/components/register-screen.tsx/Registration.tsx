"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { LandingPageConfig } from "../../lib/landingConfig";
import FormField from "./components/FormField";
import FormSelect from "./components/FormSelect";


interface RegistrationProps {
  config: LandingPageConfig;
}

interface RegistrationFormValues {
  fullName: string;
  email: string;
  organization: string;
  track: string;
}

const TRACKS = [
  { value: "ai-ml", label: "Artificial Intelligence & ML" },
  { value: "web3", label: "Web3 & Decentralized Systems" },
  { value: "devops", label: "Cloud Architecture & DevOps" },
  { value: "security", label: "Cybersecurity Operations" },
];


export default function Registration({ config }: RegistrationProps) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RegistrationFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      organization: "",
      track: "",
    },
  });

  const onSubmit = async (_data: RegistrationFormValues) => {
    ;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  if (isSubmitSuccessful) {
    return (
      <section
        id="registration"
        aria-labelledby="registration-heading"
        className="flex-grow flex items-center justify-center py-24 px-6 bg-surface"
      >
        <EventPass
          name={getValues("fullName")}
          track={getValues("track")}
          siteTitle={config.siteTitle}
        />
      </section>
    );
  }

  return (
    <section
      id="registration"
      aria-labelledby="registration-heading"
      className="py-24 px-6 bg-surface"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-xl">
        {/* Left: form */}
        <div className="lg:col-span-7 space-y-xl">
          <h1 className="font-h1 text-h1 text-on-surface mb-sm">Secure your spot</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Join the most influential minds in technology. Complete your registration to access technical tracks, networking events, and developer workshops.</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-lg bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <FormField
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                error={errors.fullName}
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              <FormField
                label="Email Address"
                type="email"
                placeholder="name@company.com"
                autoComplete="email"
                error={errors.email}
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </div>

            <FormField
              label="University / Company"
              type="text"
              placeholder="Where do you innovate?"
              autoComplete="organization"
              error={errors.organization}
              {...register("organization", {
                required: "University or company is required",
              })}
            />

            <FormSelect
              label="Track Selection"
              placeholder="Select a technical track"
              options={TRACKS}
              error={errors.track}
              {...register("track", {
                required: "Please select a track",
              })}
            />

            <div className="pt-md">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-on-primary font-h3 text-h3 py-md rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {isSubmitting ? "Submitting…" : "Complete Registration"}
              </button>
            </div>
          </form>
        </div>


        {/* Right: event info card */}
        <div className="lg:col-span-5">
          <div className="bg-surface-container-high p-lg rounded-xl border border-outline-variant shadow-soft sticky top-24">
            <div className="relative h-48 w-full rounded-lg mb-lg overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVczD7EQVp1m-8FSxc0syw_dwAf7MPZ3a_JTrmmhdu7LaF9rEyp5xcLafSefQcZ2_hhW53FLWnvZfmNr_WCpoYYURYv0HGntBeUo0uOsv72MLN2LhmlIZqEbnftkY_tqZzDVVseAjQwQyXn2MKFtAbki_QZBeRCeFOq-yJcGaQWeMCXWt4DBKzWFwRfsWjSmeppScJUsQwkChWDzGIw6KOKKhLZA8t64tC3ofdCP5z9B4bppIWV0cvBW0ZnA3dSIbbY1mzIECpQPo"
                alt="InnovateX conference venue"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent" />
              <div className="absolute bottom-md left-md">
                <span className="bg-primary text-on-primary font-label-md text-label-md px-sm py-xs rounded">
                  Featured Event
                </span>
              </div>
            </div>

            <div className="space-y-md">
              <div className="flex items-start gap-md">
                <div className="bg-surface-container-highest p-sm rounded-lg text-primary shrink-0">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    calendar_today
                  </span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface-variant">
                    Date &amp; Time
                  </h4>
                  <p className="font-h3 text-h3 text-on-surface">Nov 15–17, 2024</p>
                </div>
              </div>

              <div className="flex items-start gap-md">
                <div className="bg-surface-container-highest p-sm rounded-lg text-primary shrink-0">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    location_on
                  </span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface-variant">
                    Location
                  </h4>
                  <p className="font-h3 text-h3 text-on-surface">San Francisco, CA</p>
                </div>
              </div>

              <div className="h-px bg-outline-variant w-full my-lg" />

              <div className="space-y-sm">
                <div className="flex justify-between items-center">
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    Current Status
                  </span>
                  <span className="font-label-md text-label-md px-sm py-xs bg-secondary/10 text-secondary rounded-full font-bold">
                    Registration Open
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    Available Capacity
                  </span>
                  <span className="font-label-md text-label-md text-on-surface font-bold">
                    124 Spots Remaining
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/30 flex items-center gap-md mt-lg">
                <span
                  className="material-symbols-outlined text-primary-fixed-dim shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  info
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Early bird pricing ends in 4 days. Secure your discount today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface EventPassProps {
  name: string;
  track: string;
  siteTitle?: string;
}

function EventPass({ name, siteTitle = "InnovateX" }: EventPassProps) {
  const [passId] = useState(() => `#HX-2024-${Math.floor(100 + Math.random() * 900)}`);
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareData = {
      title: `${siteTitle} 2024 — Digital Event Pass`,
      text: `${name} is attending ${siteTitle} 2024! Pass ID: ${passId}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled — do nothing
      }
    } else {
      await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="w-full max-w-[440px] flex flex-col gap-lg">
      {/* Header */}
      <div className="text-center space-y-xs">
        <h1 className="font-h1 text-h1 text-on-surface">Digital Event Pass</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Your entry key for {siteTitle} 2024
        </p>
      </div>

      {/* Pass card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-[24px] shadow-lg overflow-hidden flex flex-col">
        {/* Branding header */}
        <div className="bg-primary px-lg py-md flex justify-between items-center">
          <span className="font-h3 text-on-primary font-bold tracking-tight">{siteTitle}</span>
          <span className="px-sm py-xs bg-secondary-container text-on-secondary-container rounded-full text-label-md font-bold flex items-center gap-xs">
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
              aria-hidden="true"
            >
              verified
            </span>
            Verified
          </span>
        </div>

        {/* Pass content */}
        <div className="p-lg flex flex-col items-center text-center gap-lg">
          {/* Attendee info */}
          <div className="space-y-xs">
            <p className="font-h2 text-[32px] leading-tight text-on-surface font-bold">{name}</p>
            <p className="font-label-md text-primary font-bold tracking-widest uppercase">
              ID: {passId}
            </p>
          </div>

          {/* QR code */}
          <div className="relative group">
            <div className="p-md bg-white border border-outline-variant rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB27i8mF-KuoS7eHMga7aJ5wQrQakvDNReQXXz7GFKHKzG96Y5kzgaYKmRzwdPZJNOLU-2ZKwaHKi6QPmnAcYV2WKAgq2ITsLS3cS3DkzdcExFoiUzRwZnBQl83OPAuaCk7KzuHAMq6QrTKlFJrz5o6w14fkhmLRb0h1bsHxGlETwyHBQWKjZJ8bHq0msrxxzeBRJdwJhRZfOGzs4Igqvjm3s9W0x3eoSsnMhkNZHazQ1Hoy2Pktx1XMLUvO_59G9a3rWaxCOs6hIE"
                alt={`QR Code for ${name}`}
                className="w-56 h-56 block mix-blend-multiply"
              />
            </div>
          </div>

          {/* Scan instruction */}
          <div className="w-full py-sm px-md bg-surface-container-low rounded-xl border border-outline-variant/30">
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center justify-center gap-xs">
              <span className="material-symbols-outlined text-[18px] text-primary" aria-hidden="true">
                info
              </span>
              Scan at Gate 4 • 08:00 AM – 09:30 AM
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-sm">
        <button className="w-full py-md bg-inverse-surface text-inverse-on-surface font-label-md text-label-md rounded-xl flex items-center justify-center gap-sm active:scale-[0.98] transition-all hover:bg-on-surface shadow-sm">
          <span className="material-symbols-outlined" aria-hidden="true">add_to_home_screen</span>
          Save to Apple Wallet
        </button>
        <div className="grid grid-cols-2 gap-sm">
          <button
            onClick={handleShare}
            className="py-md border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded-xl flex items-center justify-center gap-sm hover:bg-surface-variant/30 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              {copied ? "check" : "share"}
            </span>
            {copied ? "Copied!" : "Share"}
          </button>
          <button className="py-md border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded-xl flex items-center justify-center gap-sm hover:bg-surface-variant/30 transition-colors">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">download</span>
            Download
          </button>
        </div>
      </div>

      {/* Secondary actions */}
      <div className="flex justify-center items-center gap-lg pt-md">
        <button className="flex items-center gap-xs font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">help</span>
          Support
        </button>
      </div>
    </div>
  );
}
