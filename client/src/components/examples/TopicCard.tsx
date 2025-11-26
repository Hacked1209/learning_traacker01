import TopicCard from "../TopicCard";
import { type Topic } from "@shared/schema";

export default function TopicCardExample() {
  const sampleTopic: Topic = {
    id: "1",
    title: "React Hooks",
    description: "Learn the fundamentals of React Hooks including useState, useEffect, and custom hooks",
    status: "in_progress",
    assignedTo: "none",
    subtopics: [
      { id: "1-1", title: "useState Hook", completed: true },
      { id: "1-2", title: "useEffect Hook", completed: true },
      { id: "1-3", title: "useContext Hook", completed: false },
      { id: "1-4", title: "Custom Hooks", completed: false },
    ],
  };

  return (
    <div className="p-6 bg-background">
      <TopicCard
        topic={sampleTopic}
        onEdit={(topic) => console.log("Edit topic:", topic)}
        onDelete={(id) => console.log("Delete topic:", id)}
        onMoveToChayan={(topic) => console.log("Move to Chayan:", topic)}
        onMoveToDivyam={(topic) => console.log("Move to Divyam:", topic)}
        onToggleSubtopic={(topicId, subtopicId) =>
          console.log("Toggle subtopic:", topicId, subtopicId)
        }
        showMoveButtons={true}
      />
    </div>
  );
}
