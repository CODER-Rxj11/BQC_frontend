"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

interface Director {
  id: string;
  name: string;
  role: string;
  message: string;
  image: string;
  initials: string;
  accentColor: "primary" | "accent";
}

const directors: Director[] = [
  {
    id: "mukul-prajapati",
    name: "Mukul Prajapati",
    role: "Director",
    message:
      "At Brandqube, we turn your vision into reality. Our passionate team delivers personalized advertising and marketing solutions that make your brand stand out. Let’s create impactful campaigns together.",
    image: "/mukul-prajapati.jpg",
    initials: "MP",
    accentColor: "primary",
  },
  {
    id: "raman-prajapati",
    name: "Raman Prajapati",
    role: "Director",
    message:
      "At Brandqube, we deliver impactful results with a complete marketing approach. From indoor and outdoor advertising to digital expertise, we craft strategies that elevate your brand. Let’s make your brand shine together.",
    image: "/raman-prajapati.jpg",
    initials: "RP",
    accentColor: "accent",
  },
];

export function DirectorsMessage() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="directors-message" className="bg-bg py-section relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-brand/5 blur-[120px]"
      />

      <div className="container-bq relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2.5 sm:gap-3 justify-center">
              <span className="h-px w-6 sm:w-8 bg-primary" />
              Leadership Perspective
              <span className="h-px w-6 sm:w-8 bg-primary" />
            </span>
          </Reveal>
          <Reveal delayIndex={1}>
            <h2 className="mt-3 sm:mt-4 text-display-md font-semibold text-fg">
              Message from the <span className="text-gradient">Directors</span>
            </h2>
          </Reveal>
          <Reveal delayIndex={2}>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-muted">
              Guiding Brandqube’s vision to deliver personalized, impactful advertising and complete marketing solutions.
            </p>
          </Reveal>
        </div>

        {/* Directors Grid */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
          {directors.map((director, index) => {
            const hasError = imageErrors[director.id];
            const isPrimary = director.accentColor === "primary";

            return (
              <Reveal key={director.id} delayIndex={index + 1}>
                <div
                  className={`group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/70 p-5 sm:p-8 md:p-10 shadow-lift backdrop-blur-md transition-all duration-300 hover:shadow-2xl ${
                    isPrimary ? "hover:border-primary/50" : "hover:border-accent/50"
                  }`}
                >
                  {/* Subtle Glow Background Accent */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full blur-3xl transition-colors duration-500 ${
                      isPrimary
                        ? "bg-primary/10 group-hover:bg-primary/20"
                        : "bg-accent/10 group-hover:bg-accent/20"
                    }`}
                  />

                  {/* Watermark Quote Icon */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute top-4 right-4 sm:top-6 sm:right-6 transition-colors duration-500 ${
                      isPrimary ? "text-primary/10 group-hover:text-primary/15" : "text-accent/10 group-hover:text-accent/15"
                    }`}
                  >
                    <svg className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    {/* Header Row with Avatar & Names */}
                    <div className="flex items-center gap-3.5 sm:gap-5">
                      <div className={`relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 shrink-0 overflow-hidden rounded-2xl border-2 shadow-md bg-surface p-1 ${
                        isPrimary ? "border-primary/40" : "border-accent/40"
                      }`}>
                        {!hasError ? (
                          <Image
                            src={director.image}
                            alt={`${director.name} - ${director.role}`}
                            fill
                            quality={95}
                            className="object-cover rounded-xl"
                            onError={() => handleImageError(director.id)}
                          />
                        ) : (
                          <div className={`w-full h-full rounded-xl flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold font-display ${
                            isPrimary ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                          }`}>
                            {director.initials}
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] sm:text-xs uppercase tracking-widest font-semibold px-2 sm:px-2.5 py-0.5 rounded-full border ${
                            isPrimary
                              ? "bg-primary/10 text-primary border-primary/20"
                              : "bg-accent/10 text-accent border-accent/20"
                          }`}>
                            {director.role}
                          </span>
                        </div>
                        <h3 className="mt-1 sm:mt-2 text-lg sm:text-2xl md:text-3xl font-bold text-fg">
                          {director.name}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-muted mt-0.5">Brandqube India Pvt. Ltd.</p>
                      </div>
                    </div>

                    {/* Quote Content */}
                    <div className="mt-5 sm:mt-7 relative pl-3.5 sm:pl-4 border-l-2 border-border/80">
                      <p className="text-sm sm:text-base md:text-lg leading-relaxed text-fg/90 italic">
                        &ldquo;{director.message}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
