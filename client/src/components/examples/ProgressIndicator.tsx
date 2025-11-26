import ProgressIndicator from "../ProgressIndicator";

export default function ProgressIndicatorExample() {
  return (
    <div className="p-6 bg-background max-w-md">
      <ProgressIndicator name="Chayan" totalTopics={10} completedTopics={4} inProgressTopics={3} />
    </div>
  );
}
