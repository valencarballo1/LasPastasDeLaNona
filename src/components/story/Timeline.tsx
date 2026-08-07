import { timelineMilestones } from "@/mocks/timeline.mock";
import { TimelineItem } from "@/components/story/TimelineItem";

export function Timeline() {
  return (
    <div className="mt-4">
      {timelineMilestones.map((milestone, index) => (
        <TimelineItem key={milestone.year} milestone={milestone} isLast={index === timelineMilestones.length - 1} />
      ))}
    </div>
  );
}
