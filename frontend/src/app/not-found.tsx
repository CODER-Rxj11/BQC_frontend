import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] min-h-[80dvh] items-center bg-ink text-white py-section">
      <div className="container-bq text-center">
        <p className="eyebrow text-brand-light">404</p>
        <h1 className="mt-3 sm:mt-4 font-display text-display-lg font-bold uppercase">
          This page went off the wall.
        </h1>
        <p className="mx-auto mt-4 sm:mt-5 max-w-md text-sm sm:text-base text-tint/80 leading-relaxed">
          The billboard you&apos;re looking for isn&apos;t here — but your next
          campaign could be.
        </p>
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
          <Button href="/" variant="onDark" size="lg" className="w-full sm:w-auto">
            Back home
          </Button>
          <Button
            href="/work"
            size="lg"
            className="bg-transparent text-white ring-1 ring-white/25 hover:bg-white/10 w-full sm:w-auto"
          >
            See our work
          </Button>
        </div>
      </div>
    </section>
  );
}
