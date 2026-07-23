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

type FormStatus = "idle" | "loading" | "success";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading" || status === "success") return;

    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
    }, 900);
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
            <h2 className="mt-6 max-w-[760px] text-[32px] font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:text-[40px] lg:text-[45px]">
              How Can We Help?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[900px] text-[16px] leading-relaxed text-muted sm:text-[18px]">
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
                className="rounded-[48px] p-7 sm:p-9 lg:p-10"
              >
                {status === "success" ? (
                  <div
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <span className="inline-flex size-16 items-center justify-center rounded-full border border-[#9CBFFF]/35 bg-[#0117FF]/15">
                      <CheckCircle2
                        className="size-8 text-[#9CBFFF]"
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="mt-6 text-[28px] font-semibold text-white">
                      Message sent
                    </h3>
                    <p className="mt-3 max-w-[420px] text-[16px] leading-relaxed text-muted">
                      Thanks for reaching out. We&apos;ll review your note and
                      get back to you shortly.
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
                    <h3 className="text-[24px] font-semibold text-white sm:text-[28px]">
                      Send Message
                    </h3>
                    <p className="mt-2 text-[15px] text-muted sm:text-[16px]">
                      Fill out the form below and we&apos;ll get back to you as
                      soon as possible.
                    </p>

                    <form className="mt-8" onSubmit={handleSubmit}>
                      <fieldset
                        disabled={status === "loading"}
                        className="min-w-0 border-0 p-0"
                      >
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          {fields.map((field) => (
                            <label key={field.name} className="block">
                              <span className="mb-2 block text-[15px] font-medium text-white">
                                {field.label}
                              </span>
                              <input
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                className={cn(
                                  "h-[48px] w-full rounded-full border border-white/10 bg-black/45 px-5 text-[15px] text-white outline-none",
                                  "transition-[border-color,box-shadow] duration-200 placeholder:text-white/35",
                                  "focus:border-[#9CBFFF]/60 focus:shadow-[0_0_0_3px_rgba(156,191,255,0.15)]",
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
                          <span className="mb-2 block text-[15px] font-medium text-white">
                            Message
                          </span>
                          <textarea
                            name="message"
                            rows={5}
                            placeholder="Tell us about your idea, ask a question, or let us know how we can help..."
                            className={cn(
                              "w-full resize-y rounded-[28px] border border-white/10 bg-black/45 px-5 py-4 text-[15px] text-white outline-none",
                              "transition-[border-color,box-shadow] duration-200 placeholder:text-white/35",
                              "focus:border-[#9CBFFF]/60 focus:shadow-[0_0_0_3px_rgba(156,191,255,0.15)]",
                              "disabled:cursor-not-allowed disabled:opacity-60",
                            )}
                            required
                          />
                        </label>
                      </fieldset>

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
                              Sending...
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
                className="h-full rounded-[48px] p-7 sm:p-8"
              >
                <h3 className="text-[22px] font-semibold text-white">
                  Contact Information
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  Prefer to reach out directly? Contact us using the details
                  below, and we&apos;ll respond as soon as possible.
                </p>

                <ul className="mt-8 space-y-6">
                  <li className="flex gap-3">
                    <Mail
                      className="mt-0.5 size-5 text-[#9CBFFF]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[14px] text-white/60">Email</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-[16px] text-white transition-colors hover:text-[#9CBFFF]"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Phone
                      className="mt-0.5 size-5 text-[#9CBFFF]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[14px] text-white/60">Phone</p>
                      <a
                        href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                        className="text-[16px] text-white transition-colors hover:text-[#9CBFFF]"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Clock
                      className="mt-0.5 size-5 text-[#9CBFFF]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[14px] text-white/60">Working Hours</p>
                      <p className="text-[16px] text-white">{contactInfo.hours}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <MapPin
                      className="mt-0.5 size-5 text-[#9CBFFF]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[14px] text-white/60">Location</p>
                      <p className="text-[16px] text-white">
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
