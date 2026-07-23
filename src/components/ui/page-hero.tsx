import { cn } from "@/lib/utils";

type PageHeroProps = {
  watermark: string;
  title: string;
  className?: string;
};

export function PageHero({ watermark, title, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[42vh] items-center justify-center overflow-hidden pb-10 pt-[180px] sm:min-h-[48vh] sm:pt-[210px] lg:pt-[240px]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="mission-watermark select-none text-[64px] font-semibold tracking-[-0.04em] sm:text-[120px] lg:text-[200px]">
          {watermark}
        </span>
        <div className="mission-glow absolute left-1/2 top-1/2 h-[300px] w-[min(90vw,640px)] -translate-x-1/2 -translate-y-1/2" />
      </div>
      <h1 className="mission-headline relative z-10 text-center text-[36px] font-semibold tracking-[-0.03em] text-white sm:text-[48px] lg:text-[56px]">
        {title}
      </h1>
    </section>
  );
}
