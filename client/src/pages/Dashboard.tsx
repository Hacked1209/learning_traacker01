import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TopicCard from "@/components/TopicCard";
import ProgressIndicator from "@/components/ProgressIndicator";
import AddTopicDialog from "@/components/AddTopicDialog";
import ThemeToggle from "@/components/ThemeToggle";
import { type Topic, type InsertTopic } from "@shared/schema";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();

  // Fetch all topics
  const { data: topics = [], isLoading } = useQuery<Topic[]>({
    queryKey: ["/api/topics"],
  });

  // Create topic mutation
  const createTopicMutation = useMutation({
    mutationFn: async (newTopic: InsertTopic) => {
      const response = await apiRequest("POST", "/api/topics", newTopic);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/topics"] });
      toast({
        title: "Topic created",
        description: "The topic has been added successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create topic. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update topic mutation
  const updateTopicMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertTopic> }) => {
      const response = await apiRequest("PUT", `/api/topics/${id}`, data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/topics"] });
      toast({
        title: "Topic updated",
        description: "The topic has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update topic. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete topic mutation
  const deleteTopicMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/topics/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/topics"] });
      toast({
        title: "Topic deleted",
        description: "The topic has been deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete topic. Please try again.",
        variant: "destructive",
      });
    },
  });

  const commonTopics = topics.filter((t) => t.assignedTo === "none");
  const chayanTopics = topics.filter((t) => t.assignedTo === "chayan");
  const divyamTopics = topics.filter((t) => t.assignedTo === "divyam");

  const getStats = (userTopics: Topic[]) => {
    const total = userTopics.length;
    const completed = userTopics.filter((t) => t.status === "completed").length;
    const inProgress = userTopics.filter((t) => t.status === "in_progress").length;
    return { total, completed, inProgress };
  };

  const chayanStats = getStats(chayanTopics);
  const divyamStats = getStats(divyamTopics);

  const handleAddTopic = (insertTopic: InsertTopic) => {
    createTopicMutation.mutate(insertTopic);
  };

  const handleDeleteTopic = (id: string) => {
    deleteTopicMutation.mutate(id);
  };

  const handleMoveTopic = (topic: Topic, assignTo: "chayan" | "divyam") => {
    updateTopicMutation.mutate({
      id: topic.id,
      data: { assignedTo: assignTo },
    });
  };

  const handleToggleSubtopic = (topicId: string, subtopicId: string) => {
    const topic = topics.find((t) => t.id === topicId);
    if (!topic) return;

    const updatedSubtopics = topic.subtopics.map((s) =>
      s.id === subtopicId ? { ...s, completed: !s.completed } : s
    );
    const allCompleted = updatedSubtopics.every((s) => s.completed);
    const anyCompleted = updatedSubtopics.some((s) => s.completed);
    const newStatus = allCompleted
      ? "completed"
      : anyCompleted
      ? "in_progress"
      : "not_started";

    updateTopicMutation.mutate({
      id: topicId,
      data: { subtopics: updatedSubtopics, status: newStatus },
    });
  };

  const handleStatusChange = (topicId: string, status: Topic["status"]) => {
    updateTopicMutation.mutate({
      id: topicId,
      data: { status },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold" data-testid="text-app-title">
              Learning Progress Tracker
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track your learning journey together
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ProgressIndicator
            name="Chayan"
            totalTopics={chayanStats.total}
            completedTopics={chayanStats.completed}
            inProgressTopics={chayanStats.inProgress}
          />
          <ProgressIndicator
            name="Divyam"
            totalTopics={divyamStats.total}
            completedTopics={divyamStats.completed}
            inProgressTopics={divyamStats.inProgress}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold" data-testid="text-common-topics">
                Common Topics
              </h2>
              <AddTopicDialog onSave={handleAddTopic} />
            </div>
            <div className="space-y-4">
              {commonTopics.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No topics yet</p>
                  <AddTopicDialog
                    trigger={
                      <Button data-testid="button-add-first-topic">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Topic
                      </Button>
                    }
                    onSave={handleAddTopic}
                  />
                </div>
              ) : (
                commonTopics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    onDelete={handleDeleteTopic}
                    onMoveToChayan={(t) => handleMoveTopic(t, "chayan")}
                    onMoveToDivyam={(t) => handleMoveTopic(t, "divyam")}
                    onToggleSubtopic={handleToggleSubtopic}
                    onStatusChange={handleStatusChange}
                    showMoveButtons={true}
                  />
                ))
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold" data-testid="text-chayan-section">
                Chayan's Topics
              </h2>
              <AddTopicDialog
                trigger={
                  <Button size="sm" variant="outline" data-testid="button-add-chayan-topic">
                    <Plus className="w-4 h-4" />
                  </Button>
                }
                onSave={(t) => handleAddTopic({ ...t, assignedTo: "chayan" })}
              />
            </div>
            <div className="space-y-4">
              {chayanTopics.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No topics assigned yet
                </div>
              ) : (
                chayanTopics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    onDelete={handleDeleteTopic}
                    onToggleSubtopic={handleToggleSubtopic}
                    onStatusChange={handleStatusChange}
                  />
                ))
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold" data-testid="text-divyam-section">
                Divyam's Topics
              </h2>
              <AddTopicDialog
                trigger={
                  <Button size="sm" variant="outline" data-testid="button-add-divyam-topic">
                    <Plus className="w-4 h-4" />
                  </Button>
                }
                onSave={(t) => handleAddTopic({ ...t, assignedTo: "divyam" })}
              />
            </div>
            <div className="space-y-4">
              {divyamTopics.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No topics assigned yet
                </div>
              ) : (
                divyamTopics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    onDelete={handleDeleteTopic}
                    onToggleSubtopic={handleToggleSubtopic}
                    onStatusChange={handleStatusChange}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
