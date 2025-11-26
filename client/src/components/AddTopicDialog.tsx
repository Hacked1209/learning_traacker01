import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { type InsertTopic, type Subtopic } from "@shared/schema";

interface AddTopicDialogProps {
  trigger?: React.ReactNode;
  onSave: (topic: InsertTopic) => void;
  editTopic?: InsertTopic & { id?: string };
}

export default function AddTopicDialog({ trigger, onSave, editTopic }: AddTopicDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(editTopic?.title || "");
  const [description, setDescription] = useState(editTopic?.description || "");
  const [subtopics, setSubtopics] = useState<Subtopic[]>(editTopic?.subtopics || []);
  const [newSubtopic, setNewSubtopic] = useState("");

  const handleAddSubtopic = () => {
    if (newSubtopic.trim()) {
      setSubtopics([
        ...subtopics,
        {
          id: Date.now().toString(),
          title: newSubtopic.trim(),
          completed: false,
        },
      ]);
      setNewSubtopic("");
    }
  };

  const handleRemoveSubtopic = (id: string) => {
    setSubtopics(subtopics.filter((s) => s.id !== id));
  };

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        title: title.trim(),
        description: description.trim(),
        subtopics,
        status: editTopic?.status || "not_started",
        assignedTo: editTopic?.assignedTo || "none",
      });
      setTitle("");
      setDescription("");
      setSubtopics([]);
      setNewSubtopic("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button data-testid="button-add-topic">
            <Plus className="w-4 h-4 mr-2" />
            Add Topic
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl" data-testid="dialog-add-topic">
        <DialogHeader>
          <DialogTitle>{editTopic ? "Edit Topic" : "Add New Topic"}</DialogTitle>
          <DialogDescription>
            Create a new learning topic with optional subtopics to track your progress.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Topic Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., React Hooks"
              data-testid="input-topic-title"
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of what this topic covers..."
              rows={3}
              data-testid="input-topic-description"
            />
          </div>

          <div>
            <Label>Subtopics (Optional)</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newSubtopic}
                onChange={(e) => setNewSubtopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSubtopic()}
                placeholder="Add a subtopic..."
                data-testid="input-subtopic"
              />
              <Button onClick={handleAddSubtopic} size="icon" data-testid="button-add-subtopic">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {subtopics.length > 0 && (
              <div className="mt-3 space-y-2">
                {subtopics.map((subtopic) => (
                  <div
                    key={subtopic.id}
                    className="flex items-center justify-between bg-muted px-3 py-2 rounded-md"
                    data-testid={`subtopic-item-${subtopic.id}`}
                  >
                    <span className="text-sm">{subtopic.title}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveSubtopic(subtopic.id)}
                      data-testid={`button-remove-subtopic-${subtopic.id}`}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} data-testid="button-cancel">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()} data-testid="button-save-topic">
            {editTopic ? "Save Changes" : "Add Topic"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
