import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  name: string;
  totalTopics: number;
  completedTopics: number;
  inProgressTopics: number;
}

export default function ProgressIndicator({
  name,
  totalTopics,
  completedTopics,
  inProgressTopics,
}: ProgressIndicatorProps) {
  const progressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold" data-testid={`text-name-${name}`}>
          {name}'s Progress
        </h3>
        <span className="text-2xl font-bold text-primary" data-testid={`text-percent-${name}`}>
          {progressPercent}%
        </span>
      </div>

      <Progress value={progressPercent} className="mb-4" />

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-semibold" data-testid={`text-total-${name}`}>
            {totalTopics}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Total</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-chart-4" data-testid={`text-inprogress-${name}`}>
            {inProgressTopics}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">In Progress</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-chart-2" data-testid={`text-completed-${name}`}>
            {completedTopics}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Completed</div>
        </div>
      </div>
    </Card>
  );
}
