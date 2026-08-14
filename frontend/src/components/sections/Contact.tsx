"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { channelChips, site } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Contact — "The Brief" (blueprint §2.9).
 * Channel-first conversational funnel with disabled submit button
 * until all mandatory fields are validly filled.
 */
export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [business, setBusiness] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Field validation checks
  const isNameValid = name.trim().length >= 2;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email.trim());
  const digitsOnly = phone.replace(/\D/g, "");
  const isPhoneValid = digitsOnly.length >= 10 && digitsOnly.length <= 12;

  // Form is valid only when all mandatory fields are valid
  const isFormValid = isNameValid && isEmailValid && isPhoneValid;

  const toggle = (chip: string) =>
    setSelected((s) => (s.includes(chip) ? s.filter((c) => c !== chip) : [...s, chip]));

  const preview =
    selected.length === 0
      ? "everywhere your customers are"
      : selected.length <= 2
        ? selected.join(" + ").toLowerCase()
        : `${selected.slice(0, 2).join(", ").toLowerCase()} + ${selected.length - 2} more`;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    setErrorMsg(null);
    setSubmitting(true);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      business: business.trim(),
      channels: selected,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${apiUrl}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit enquiry");
      }

      // Clear Form Inputs & Channel Chips on Success
      setName("");
      setEmail("");
      setPhone("");
      setCity("");
      setBusiness("");
      setSelected([]);
      setSent(true);

      setTimeout(() => {
        setSent(false);
      }, 7000);
    } catch (err: unknown) {
      console.error("Enquiry submission error:", err);
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(msg || "Failed to send brief. Please try again or WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const waHref = `https://wa.me/${site.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    "Hi BrandQube, I'd like to advertise on " + (selected.join(", ") || "multiple channels")
  )}`;

  return (
    <section id="contact" className="bg-bg py-section">
      <div className="container-bq grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14 xl:gap-20">
        {/* Left: pitch + direct contact */}
        <div>
          <SectionHeading
            eyebrow="Start a campaign"
            title={
              <>
                Let&apos;s put your brand on{" "}
                <span className="text-gradient">{preview}</span>.
              </>
            }
            lead="Tell us where you want to show up. We reply within a few hours — and yes, you can just call us."
          />

          <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={waHref} variant="primary" className="flex-1 w-full sm:w-auto">
              WhatsApp us
            </Button>
            <Button href={`tel:${site.phone.replace(/\s/g, "")}`} variant="secondary" className="flex-1 w-full sm:w-auto">
              Call {site.phone}
            </Button>
          </div>

          <dl className="mt-8 sm:mt-12 space-y-3.5 sm:space-y-4 border-t border-hairline pt-6 sm:pt-8 text-xs sm:text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted shrink-0">Address</dt>
              <dd className="font-medium text-fg text-right max-w-[280px]">{site.address}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Phone</dt>
              <dd className="font-medium text-fg">
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-brand transition-colors">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Email</dt>
              <dd className="font-medium text-fg">
                <a href={`mailto:${site.email}`} className="hover:text-brand transition-colors break-all">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* Right: the brief form */}
        <Reveal>
          <form
            onSubmit={onSubmit}
            className="rounded-xl2 border border-border bg-surface p-5 sm:p-7 md:p-9 shadow-soft"
          >
            <fieldset>
              <legend className="text-xs sm:text-sm font-semibold text-fg">
                I want to advertise on
              </legend>
              <div className="mt-3.5 sm:mt-4 flex flex-wrap gap-2 sm:gap-2.5">
                {channelChips.map((chip) => {
                  const active = selected.includes(chip);
                  return (
                    <button
                      type="button"
                      key={chip}
                      onClick={() => toggle(chip)}
                      aria-pressed={active}
                      className={cn(
                        "rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200",
                        active
                          ? "border-primary bg-primary text-white shadow-soft"
                          : "border-border bg-bg text-muted hover:border-primary hover:text-primary"
                      )}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-6 sm:mt-7 grid gap-3.5 sm:gap-4 sm:grid-cols-2">
              <Field
                label="Your name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Priya Sharma"
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sales@example.com"
                required
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 97555 00240"
                required
              />
              <Field
                label="City"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Bhopal"
              />
              <Field
                label="Business / Brand"
                name="business"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder="Your brand name"
                className="sm:col-span-2"
              />
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted">We&apos;ll reply within a few hours.</p>
              <Button
                type="submit"
                size="lg"
                disabled={!isFormValid || submitting}
                className={cn("w-full sm:w-auto transition-all", !isFormValid && "opacity-50 cursor-not-allowed")}
              >
                {submitting ? "Sending..." : "Send the brief →"}
              </Button>
            </div>

            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-lg bg-tint border border-primary/20 px-4 py-3 text-xs sm:text-sm text-primary font-medium flex items-center justify-between"
              >
                <span>Brief received! Our team will reach out to you shortly.</span>
                <span className="text-xs font-bold text-primary shrink-0 ml-2">✓ Sent</span>
              </motion.p>
            )}

            {errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-xs sm:text-sm text-red-500 font-medium"
              >
                ⚠️ {errorMsg}
              </motion.p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  className,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-medium text-muted">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-12 rounded-lg border border-border bg-bg px-4 text-fg placeholder:text-muted/50 transition-colors focus:border-primary focus:outline-none"
      />
    </label>
  );
}
