"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { SurfaceCard } from "@/components/ui/surface-card";
import { contactInfo } from "@/data/site";
import { cn } from "@/lib/utils";

const fields = [
  {
    name: "name",
    label: "Name",
    placeholder: "Noora Khalid",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "+973 12345678",
    type: "tel",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "you@company.com",
    type: "email",
  },
  {
    name: "company",
    label: "Company",
    placeholder: "Your Company",
    type: "text",
  },
  {
    name: "role",
    label: "Role",
    placeholder: "Founder, Head of Product ...",
    type: "text",
  },
  {
    name: "services",
    label: "Services",
    placeholder: "Branding",
    type: "text",
  },
  {
    name: "budget",
    label: "Budget",
    placeholder: "< 100BD",
    type: "text",
  },
  {
    name: "timeline",
    label: "Timeline",
    placeholder: "3 months",
    type: "text",
  },
] as const;

type FormStatus = "idle" | "loading" | "success" | "error";

function buildMailto(data: FormData) {
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const company = String(data.get("company") ?? "").trim();
  const role = String(data.get("role") ?? "").trim();
  const services = String(data.get("services") ?? "").trim();
  const budget = String(data.get("budget") ?? "").trim();
  const timeline = String(data.get("timeline") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();

  const subject = encodeURIComponent(
    `NerdLogic inquiry from ${name || "website"}`,
  );
  const body = encodeURIComponent(
    [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Company: ${company}`,
      `Role: ${role}`,
      `Services: ${services}`,
      `Budget: ${budget}`,
      `Timeline: ${timeline}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  );

  return `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
}

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("loading");

    try {
      const mailto = buildMailto(data);
      // Honest delivery: opens the user's email client with the inquiry prefilled.
      window.location.href = mailto;
      window.setTimeout(() => setStatus("success"), 400);
    } catch {
      setStatus("error");
    }
  };

  return (
    <main>
      <PageHero watermark="Lets Talk" title="Lets Talk" />

      <section className="relative pb-20 pt-4 lg:pb-28">
        <Container>
          <Reveal>
            <SectionBadge label="Get in Touch" />
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-6 max-w-[760px] text-[28px] font-normal leading-[1.15] tracking-[-0.03em] text-white sm:text-[36px] lg:text-[40px]">
              How Can We Help?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[900px] text-[16px] leading-relaxed text-muted sm:text-[17px]">
              Whether you have a question, an idea, or a project in mind,
              we&apos;d love to hear from you. Tell us what you&apos;re looking
              for, and our team will help you find the right solution.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <Reveal>
              <SurfaceCard
                tone="raised"
                interactive={false}
                className="rounded-[40px] p-6 sm:rounded-[44px] sm:p-8 lg:p-9"
              >
                {status === "success" ? (
                  <div
                    className="flex min-h-[360px] flex-col items-center justify-center text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <span className="inline-flex size-14 items-center justify-center rounded-full border border-[var(--brand-light)]/35 bg-[var(--brand-primary)]/15">
                      <CheckCircle2
                        className="size-7 text-[var(--brand-light)]"
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="font-display mt-6 text-[24px] font-normal text-white">
                      Email draft ready
                    </h3>
                    <p className="mt-3 max-w-[420px] text-[15px] leading-relaxed text-muted">
                      Your mail app should open with the message filled in. If
                      nothing opened, email us directly at{" "}
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-[var(--brand-light)] underline-offset-2 hover:underline"
                      >
                        {contactInfo.email}
                      </a>
                      .
                    </p>
                    <Button
                      type="button"
                      variant="secondary"
                      className="mt-8"
                      onClick={() => setStatus("idle")}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display text-[22px] font-normal text-white sm:text-[24px]">
                      Send Message
                    </h3>
                    <p className="mt-2 text-[14px] text-muted sm:text-[15px]">
                      Submit opens your email app with a prefilled note to{" "}
                      {contactInfo.email}.
                    </p>

                    <form className="mt-8" onSubmit={handleSubmit}>
                      <fieldset
                        disabled={status === "loading"}
                        className="min-w-0 border-0 p-0"
                      >
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          {fields.map((field) => (
                            <label key={field.name} className="block">
                              <span className="mb-2 block text-[14px] font-medium text-white">
                                {field.label}
                              </span>
                              <input
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                autoComplete={
                                  field.name === "email"
                                    ? "email"
                                    : field.name === "name"
                                      ? "name"
                                      : field.name === "phone"
                                        ? "tel"
                                        : "on"
                                }
                                className={cn(
                                  "h-[44px] w-full rounded-full border border-white/10 bg-black/45 px-5 text-[15px] text-white outline-none",
                                  "transition-[border-color,box-shadow] duration-200 placeholder:text-white/35",
                                  "focus:border-[var(--brand-light)]/60 focus:shadow-[0_0_0_3px_rgba(107,182,255,0.15)]",
                                  "disabled:cursor-not-allowed disabled:opacity-60",
                                )}
                                required={
                                  field.name === "name" || field.name === "email"
                                }
                              />
                            </label>
                          ))}
                        </div>

                        <label className="mt-5 block">
                          <span className="mb-2 block text-[14px] font-medium text-white">
                            Message
                          </span>
                          <textarea
                            name="message"
                            rows={5}
                            placeholder="Tell us about your idea, ask a question, or let us know how we can help..."
                            className={cn(
                              "w-full resize-y rounded-[24px] border border-white/10 bg-black/45 px-5 py-4 text-[15px] text-white outline-none",
                              "transition-[border-color,box-shadow] duration-200 placeholder:text-white/35",
                              "focus:border-[var(--brand-light)]/60 focus:shadow-[0_0_0_3px_rgba(107,182,255,0.15)]",
                              "disabled:cursor-not-allowed disabled:opacity-60",
                            )}
                            required
                          />
                        </label>
                      </fieldset>

                      {status === "error" ? (
                        <p
                          className="mt-4 text-[14px] text-red-300"
                          role="alert"
                        >
                          Could not open your email app. Please write us at{" "}
                          <a
                            href={`mailto:${contactInfo.email}`}
                            className="underline underline-offset-2"
                          >
                            {contactInfo.email}
                          </a>
                          .
                        </p>
                      ) : null}

                      <div className="mt-7">
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={status === "loading"}
                          className="min-w-[160px]"
                        >
                          {status === "loading" ? (
                            <>
                              <Loader2
                                className="size-5 animate-spin"
                                aria-hidden="true"
                              />
                              Opening email...
                            </>
                          ) : (
                            "Submit Form"
                          )}
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </SurfaceCard>
            </Reveal>

            <Reveal delay={0.08}>
              <SurfaceCard
                tone="soft"
                interactive={false}
                className="h-full rounded-[40px] p-6 sm:rounded-[44px] sm:p-7"
              >
                <h3 className="font-display text-[20px] font-normal text-white">
                  Contact Information
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted sm:text-[15px]">
                  Prefer to reach out directly? Contact us using the details
                  below, and we&apos;ll respond as soon as possible.
                </p>

                <ul className="mt-8 space-y-6">
                  <li className="flex gap-3">
                    <Mail
                      className="mt-0.5 size-5 text-[var(--brand-light)]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[13px] text-white/60">Email</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-[15px] text-white transition-colors hover:text-[var(--brand-light)]"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Phone
                      className="mt-0.5 size-5 text-[var(--brand-light)]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[13px] text-white/60">Phone</p>
                      <a
                        href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                        className="text-[15px] text-white transition-colors hover:text-[var(--brand-light)]"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Clock
                      className="mt-0.5 size-5 text-[var(--brand-light)]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[13px] text-white/60">Working Hours</p>
                      <p className="text-[15px] text-white">{contactInfo.hours}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <MapPin
                      className="mt-0.5 size-5 text-[var(--brand-light)]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[13px] text-white/60">Location</p>
                      <p className="text-[15px] text-white">
                        {contactInfo.location}
                      </p>
                    </div>
                  </li>
                </ul>
              </SurfaceCard>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
