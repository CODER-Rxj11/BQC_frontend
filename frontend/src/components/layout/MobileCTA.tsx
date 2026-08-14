"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/data";

/**
 * Mobile sticky conversion bar (blueprint §6) — always one thumb-tap from
 * Call / WhatsApp / Start. Appears after the hero, hidden on desktop.
 */
export function MobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = `https://wa.me/${site.whatsapp.replace(/[^\d]/g, "")}`;
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[90] border-t border-hairline glass p-2.5 sm:p-3 md:hidden"
          style={{ paddingBottom: "max(0.65rem, env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href={tel}
              className="grid h-10 sm:h-12 flex-1 place-items-center rounded-full border border-border text-xs sm:text-sm font-semibold text-fg transition-colors hover:bg-surface"
            >
              Call
            </a>
            <a
              href={wa}
              className="grid h-10 sm:h-12 flex-1 place-items-center rounded-full border border-border text-xs sm:text-sm font-semibold text-fg transition-colors hover:bg-surface"
            >
              WhatsApp
            </a>
            <Link
              href="/contact"
              className="grid h-10 sm:h-12 flex-[1.4] place-items-center rounded-full bg-primary text-xs sm:text-sm font-semibold text-white shadow-soft transition-all hover:bg-primary/90"
            >
              Start Campaign
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
