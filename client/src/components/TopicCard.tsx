import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronRight, GripVertical, Pencil, Trash2, UserPlus } from "lucide-react";
import { type Topic } from "@shared/schema";

interface TopicCardProps {
  topic: Topic;
  onEdit?: (topic: Topic) => void;
  onDelete?: (id: string) => void;
  onMoveToChayan?: (topic: Topic) => void;
  onMoveToDivyam?: (topic: Topic) => void;
  onToggleSubtopic?: (topicId: string, subtopicId: string) => void;
  onStatusChange?: (topicId: string, status: Topic["status"]) => void;
  showMoveButtons?: boolean;
}

export default function TopicCard({
  topic,
  onEdit,
  onDelete,
  onMoveToChayan,
  onMoveToDivyam,
  onToggleSubtopic,
  onStatusChange,
  showMoveButtons = false,
}: TopicCardProps) {
  const [expanded, setExpanded] = useState(false);

  const statusColors = {
    not_started: "bg-muted text-muted-foreground",
    in_progress: "bg-chart-4 text-white",
    completed: "bg-chart-2 text-white",
  };

  const statusLabels = {
    not_started: "Not Started",
    in_progress: "In Progress",
    completed: "Completed",
  };

  const completedSubtopics = topic.subtopics.filter((s) => s.completed).length;
  const totalSubtopics = topic.subtopics.length;
  const progressPercent = totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0;

  return (
    <Card className="p-6 hover-elevate active-elevate-2">
      <div className="flex items-start gap-3">
        <button
          className="mt-1 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
          data-testid="button-drag-handle"
        >
          <GripVertical className="w-5 h-5" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-medium" data-testid={`text-topic-title-${topic.id}`}>
              {topic.title}
            </h3>
            <Badge className={statusColors[topic.status]} data-testid={`badge-status-${topic.id}`}>
              {statusLabels[topic.status]}
            </Badge>
          </div>

          {topic.description && (
            <p className="text-sm text-muted-foreground mb-3" data-testid={`text-description-${topic.id}`}>
              {topic.description}
            </p>
          )}

          {topic.subtopics.length > 0 && (
            <div className="mb-3">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 text-sm font-medium hover-elevate active-elevate-2 px-2 py-1 rounded-md -ml-2"
                data-testid={`button-expand-${topic.id}`}
              >
                {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                <span>
                  {completedSubtopics}/{totalSubtopics} Subtopics
                </span>
                {totalSubtopics > 0 && (
                  <span className="text-xs text-muted-foreground">({progressPercent}%)</span>
                )}
              </button>

              {expanded && (
                <div className="mt-2 space-y-2 pl-6">
                  {topic.subtopics.map((subtopic) => (
                    <div
                      key={subtopic.id}
                      className="flex items-center gap-2"
                      data-testid={`subtopic-${subtopic.id}`}
                    >
                      <Checkbox
                        checked={subtopic.completed}
                        onCheckedChange={() => onToggleSubtopic?.(topic.id, subtopic.id)}
                        data-testid={`checkbox-subtopic-${subtopic.id}`}
                      />
                      <span
                        className={`text-sm ${subtopic.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {subtopic.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {showMoveButtons && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onMoveToChayan?.(topic)}
                  data-testid={`button-move-chayan-${topic.id}`}
                >
                  <UserPlus className="w-3 h-3 mr-1" />
                  Move to Chayan
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onMoveToDivyam?.(topic)}
                  data-testid={`button-move-divyam-${topic.id}`}
                >
                  <UserPlus className="w-3 h-3 mr-1" />
                  Move to Divyam
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit?.(topic)}
              data-testid={`button-edit-${topic.id}`}
            >
              <Pencil className="w-3 h-3 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete?.(topic.id)}
              data-testid={`button-delete-${topic.id}`}
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
