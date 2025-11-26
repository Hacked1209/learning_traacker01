import AddTopicDialog from "../AddTopicDialog";

export default function AddTopicDialogExample() {
  return (
    <div className="p-6 bg-background">
      <AddTopicDialog onSave={(topic) => console.log("Topic saved:", topic)} />
    </div>
  );
}
