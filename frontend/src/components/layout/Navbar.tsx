"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/** Brand logo lockup: logo02.png icon when transparent (no navbar bg), logo.png icon when scrolled (glass bg) + BrandQube text */
function Logo({ scrolled }: { scrolled?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className="flex items-center gap-2.5 group">
      <div className="relative h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        <Image
          src={scrolled ? "/logo.png" : "/logo02.png"}
          alt={site.name}
          fill
          priority
          sizes="40px"
          className="object-contain"
        />
      </div>
      <span className="font-sans text-2xl font-bold tracking-tight sm:text-[1.7rem] leading-none">
        <span className={cn("transition-colors duration-300", scrolled ? "text-fg" : "text-white")}>Brand</span>
        <span className="text-primary">Qube</span>
      </span>
    </Link>
  );
}

/** Sticky navbar: transparent over the hero, condenses to a glass bar on scroll. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile overlay is open.
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
        scrolled ? "glass border-b border-hairline py-3" : "py-5"
      )}
    >
      <nav className="container-bq flex items-center justify-between">
        <Logo scrolled={scrolled} />

        {/* Desktop links */}
        <ul
          className={cn(
            "hidden items-center gap-8 text-sm font-medium tracking-tight md:flex",
            scrolled ? "text-fg" : "text-white/90"
          )}
        >
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative py-1 transition-colors hover:text-primary",
                    active && "text-primary"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-300 group-hover:scale-x-100",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button href="/contact" size="sm">
              Start Your Campaign
            </Button>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={cn(
              "flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden",
              scrolled ? "text-fg" : "text-white"
            )}
          >
            <span className="h-0.5 w-6 bg-current" />
            <span className="h-0.5 w-6 bg-current" />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] bg-ink text-white md:hidden overflow-y-auto pb-12"
          >
            <div className="container-bq flex items-center justify-between py-4 sm:py-5">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                <div className="relative h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0">
                  <Image src="/logo02.png" alt={site.name} fill sizes="36px" className="object-contain" />
                </div>
                <span className="font-sans text-xl sm:text-2xl font-bold tracking-tight leading-none">
                  <span className="text-white">Brand</span>
                  <span className="text-primary">Qube</span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center text-2xl"
              >
                ✕
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              className="container-bq mt-8 sm:mt-10 flex flex-col gap-1.5 sm:gap-2"
            >
              {nav.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 sm:py-3 font-display text-3xl sm:text-4xl transition-colors hover:text-brand-light"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="container-bq mt-8 sm:mt-12">
              <Button href="/contact" variant="onDark" size="lg" className="w-full" onClick={() => setOpen(false)}>
                Start Your Campaign
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
