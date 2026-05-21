"use client";

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

const TRACK_LABEL: Record<string, string> = Object.fromEntries(
  TRACKS.map((t) => [t.value, t.label])
);

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
    // Replace with real API call, e.g.:
    // await fetch('/api/register', { method: 'POST', body: JSON.stringify(data) });
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <section
      id="registration"
      aria-labelledby="registration-heading"
      className="py-24 px-6 bg-surface"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-xl">
        {/* Left: form */}
        <div className="lg:col-span-7 space-y-xl">

          {isSubmitSuccessful ? (
            <SuccessCard
              name={getValues("fullName")}
              track={getValues("track")}
              siteTitle={config.siteTitle}
            />
          ) : (
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
          )}
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

interface SuccessCardProps {
  name: string;
  track: string;
  siteTitle?: string;
}

function SuccessCard({ name, track, siteTitle = "InnovateX" }: SuccessCardProps) {
  return (
    <div className="bg-secondary-container/20 border-2 border-secondary rounded-xl p-lg space-y-md">
      <div className="flex items-center gap-md text-secondary">
        <span
          className="material-symbols-outlined text-h2"
          style={{ fontVariationSettings: "'FILL' 1" }}
          aria-hidden="true"
        >
          check_circle
        </span>
        <h2 className="font-h2 text-h2">Registration Confirmed</h2>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-lg flex flex-col md:flex-row items-center gap-lg">
        <div className="bg-white p-sm border border-outline-variant rounded shadow-inner shrink-0">
          <div className="w-32 h-32 bg-slate-100 flex items-center justify-center text-on-surface-variant">
            <span
              className="material-symbols-outlined text-[64px]"
              aria-label="QR code placeholder"
            >
              qr_code_2
            </span>
          </div>
        </div>
        <div className="space-y-xs text-center md:text-left">
          <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
            Digital Ticket
          </p>
          <h3 className="font-h3 text-h3 text-on-surface">{name}</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {siteTitle} • {TRACK_LABEL[track] ?? "Participant"}
          </p>
        </div>
      </div>
    </div>
  );
}
