import type { TimelineMilestone } from "@/mocks/timeline.mock";

export function TimelineItem({ milestone, isLast }: { milestone: TimelineMilestone; isLast?: boolean }) {
  return (
    <div className="relative flex gap-6 pb-12 last:pb-0">
      <div className="flex flex-col items-center">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red font-display text-sm text-warm-white">
          {milestone.year}
        </span>
        {!isLast ? <span className="mt-2 w-px flex-1 bg-muted/25" /> : null}
      </div>

      <div className="pt-1.5">
        <h3 className="font-display text-xl text-carbon">{milestone.title}</h3>
        {milestone.description ? <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted">{milestone.description}</p> : null}
      </div>
    </div>
  );
}
