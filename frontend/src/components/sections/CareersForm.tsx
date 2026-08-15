"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

const openPositions = [
  {
    title: "OOH Campaign & Operations Lead",
    type: "Full-Time",
    location: "Bhopal (On-Site)",
    description:
      "Manage end-to-end execution of large-format outdoor billboards, highway wraps, and pan-India transit campaigns.",
  },
  {
    title: "BTL & Experiential Producer",
    type: "Full-Time",
    location: "Pan-India (Field & HQ)",
    description:
      "Design and execute mela stalls, demo van tours, roadshows, and interactive on-ground customer experiences.",
  },
  {
    title: "Visual Merchandiser & Designer",
    type: "Full-Time",
    location: "Bhopal",
    description:
      "Develop 3D illuminated signages, retail showroom elevations, ACP cladding layouts, and brand graphics.",
  },
  {
    title: "Media & Client Success Executive",
    type: "Full-Time",
    location: "Hybrid / Bhopal",
    description:
      "Build relationships with enterprise brand partners, curate campaign briefs, and deliver measurable ROI reports.",
  },
];

export function CareersForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("OOH Campaign & Operations Lead");
  const [experience, setExperience] = useState("1-3 Years");
  const [portfolio, setPortfolio] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Field validation checks
  const isNameValid = name.trim().length >= 2;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email.trim());
  const digitsOnly = phone.replace(/\D/g, "");
  const isPhoneValid = digitsOnly.length >= 10 && digitsOnly.length <= 12;

  const isFormValid = isNameValid && (isEmailValid || isPhoneValid);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    setErrorMsg(null);
    setSubmitting(true);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      position: position.trim(),
      experience: experience.trim(),
      portfolio: portfolio.trim(),
      coverLetter: coverLetter.trim(),
    };

    try {
      const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://bqc-backend-1.onrender.com").replace(/\/$/,"");

      const res = await fetch(`${apiUrl}/api/careers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit application");
      }

      // Clear Form Inputs on Success
      setName("");
      setEmail("");
      setPhone("");
      setPortfolio("");
      setCoverLetter("");
      setSent(true);

      setTimeout(() => {
        setSent(false);
      }, 8000);
    } catch (err: unknown) {
      console.error("Career application submission error:", err);
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(msg || "Failed to submit application. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="careers" className="bg-bg py-section">
      <div className="container-bq">
        {/* Open Roles Overview */}
        <div className="mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Open Roles"
            title={
              <>
                Where Do You <span className="text-gradient">Fit In?</span>
              </>
            }
            lead="We are always looking for ambitious talent. Choose an open role or submit a general application below."
          />

          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {openPositions.map((role, idx) => (
              <Reveal key={role.title} delayIndex={idx + 1}>
                <div
                  onClick={() => setPosition(role.title)}
                  className={cn(
                    "group relative h-full flex flex-col justify-between rounded-2xl border p-4 sm:p-6 shadow-soft transition-all duration-300 cursor-pointer backdrop-blur-sm",
                    position === role.title
                      ? "border-primary bg-primary/5 shadow-lift"
                      : "border-border/80 bg-surface/60 hover:border-primary/50"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                        {role.type}
                      </span>
                      <span className="text-[11px] sm:text-xs text-muted">{role.location}</span>
                    </div>
                    <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-bold text-fg group-hover:text-primary transition-colors">
                      {role.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{role.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center text-xs font-semibold text-primary">
                    <span>{position === role.title ? "Selected Position ✓" : "Apply For This Role"}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Form & Direct HR Info Grid */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14 xl:gap-20">
          {/* Left info box */}
          <div>
            <SectionHeading
              eyebrow="Application Form"
              title={
                <>
                  Ready to Make Your <span className="text-gradient">Mark?</span>
                </>
              }
              lead="Fill out the application brief below. Your details will be routed directly to our Careers & HR team."
            />

            <div className="mt-6 sm:mt-8 rounded-2xl border border-border/80 bg-surface/60 p-5 sm:p-7 md:p-8 shadow-soft backdrop-blur-sm">
              <h4 className="text-base font-bold text-fg">Direct HR Inquiry</h4>
              <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                Have questions or prefer sending your CV directly with a PDF attachment? Reach out to our talent team:
              </p>
              <div className="mt-4 sm:mt-5 space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    ✉️
                  </span>
                  <a href={`mailto:${site.email}`} className="font-semibold text-fg hover:text-primary transition-colors break-all">
                    {site.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    📞
                  </span>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-semibold text-fg hover:text-primary transition-colors">
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <Reveal>
            <form
              onSubmit={onSubmit}
              className="rounded-xl2 border border-border bg-surface p-5 sm:p-7 md:p-9 shadow-soft"
            >
              <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Verma"
                  required
                />
                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  required
                />
                <Field
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
                <SelectField
                  label="Target Position"
                  name="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  options={[
                    "OOH Campaign & Operations Lead",
                    "BTL & Experiential Producer",
                    "Visual Merchandiser & Designer",
                    "Media & Client Success Executive",
                    "General Application / Other",
                  ]}
                />
                <SelectField
                  label="Experience Level"
                  name="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  options={[
                    "Fresh Graduate / Entry Level",
                    "1-3 Years",
                    "3-5 Years",
                    "5+ Years Senior",
                  ]}
                />
                <Field
                  label="Portfolio / Resume URL"
                  name="portfolio"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://linkedin.com/in/... or Google Drive link"
                />
                <TextareaField
                  label="Cover Letter / Brief Pitch"
                  name="coverLetter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Tell us about your background, key achievements, and why you want to join BrandQube..."
                  className="sm:col-span-2"
                />
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted">Your application is confidential.</p>
                <Button
                  type="submit"
                  size="lg"
                  disabled={!isFormValid || submitting}
                  className={cn("w-full sm:w-auto transition-all", !isFormValid && "opacity-50 cursor-not-allowed")}
                >
                  {submitting ? "Submitting..." : "Submit Application →"}
                </Button>
              </div>

              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm text-primary font-medium flex items-center justify-between"
                >
                  <span>Application received! Our HR team will review your CV and reach out to you shortly.</span>
                  <span className="text-xs font-bold text-primary shrink-0 ml-2">✓ Submitted</span>
                </motion.p>
              )}

              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm text-red-500 font-medium"
                >
                  ⚠️ {errorMsg}
                </motion.p>
              )}
            </form>
          </Reveal>
        </div>
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

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-medium text-muted">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-12 rounded-lg border border-border bg-bg px-4 text-fg transition-colors focus:border-primary focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-surface text-fg">
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-medium text-muted">{label}</span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        placeholder={placeholder}
        className="rounded-lg border border-border bg-bg p-4 text-fg placeholder:text-muted/50 transition-colors focus:border-primary focus:outline-none"
      />
    </label>
  );
}
