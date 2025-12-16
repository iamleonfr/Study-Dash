import { useState } from "react";
import { Plus, Trash2, ChevronRight } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LearningTopic } from "@/types";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const statusOptions: { value: LearningTopic["status"]; label: string }[] = [
  { value: "planned", label: "Planned" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const Learning = () => {
  const [topics, setTopics] = useLocalStorage<LearningTopic[]>("learning-topics", []);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState<LearningTopic["status"]>("planned");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const addTopic = () => {
    if (!newTitle.trim()) {
      toast.error("Please enter a topic title");
      return;
    }

    const topic: LearningTopic = {
      id: crypto.randomUUID(),
      title: newTitle.trim(),
      description: newDescription.trim(),
      status: newStatus,
      createdAt: new Date().toISOString(),
    };

    setTopics([topic, ...topics]);
    setNewTitle("");
    setNewDescription("");
    setNewStatus("planned");
    setIsFormOpen(false);
    toast.success("Learning topic added!");
  };

  const updateStatus = (id: string, status: LearningTopic["status"]) => {
    setTopics(
      topics.map((topic) => (topic.id === id ? { ...topic, status } : topic))
    );
    toast.success("Status updated");
  };

  const deleteTopic = (id: string) => {
    setTopics(topics.filter((topic) => topic.id !== id));
    toast.success("Topic deleted");
  };

  const groupedTopics = {
    planned: topics.filter((t) => t.status === "planned"),
    "in-progress": topics.filter((t) => t.status === "in-progress"),
    completed: topics.filter((t) => t.status === "completed"),
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Learning Tracker</h1>
          <p className="text-muted-foreground">
            Track your learning journey and stay on top of your studies.
          </p>
        </div>

        {/* Add Topic Button/Form */}
        <div className="bg-card rounded-xl shadow-card mb-8 overflow-hidden animate-slide-up">
          {!isFormOpen ? (
            <button
              onClick={() => setIsFormOpen(true)}
              className="w-full p-4 flex items-center justify-center gap-2 text-primary hover:bg-secondary/50 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add New Learning Topic</span>
            </button>
          ) : (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Add New Learning Topic
              </h2>
              <div className="space-y-4">
                <Input
                  placeholder="Topic title (e.g., React Hooks)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Description (optional)"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={2}
                />
                <Select
                  value={newStatus}
                  onValueChange={(v) => setNewStatus(v as LearningTopic["status"])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-3">
                  <Button onClick={addTopic} className="flex-1">
                    Add Topic
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsFormOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Topics by Status */}
        <div className="grid lg:grid-cols-3 gap-6">
          {(Object.keys(groupedTopics) as LearningTopic["status"][]).map(
            (status, colIndex) => (
              <div
                key={status}
                className="animate-slide-up"
                style={{ animationDelay: `${colIndex * 100}ms` }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <StatusBadge variant={status} className="text-sm px-3 py-1">
                    {status.replace("-", " ")}
                  </StatusBadge>
                  <span className="text-sm text-muted-foreground">
                    ({groupedTopics[status].length})
                  </span>
                </div>
                <div className="space-y-3">
                  {groupedTopics[status].length > 0 ? (
                    groupedTopics[status].map((topic, index) => (
                      <div
                        key={topic.id}
                        className="bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 animate-scale-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-medium text-foreground">
                            {topic.title}
                          </h3>
                          <button
                            onClick={() => deleteTopic(topic.id)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all flex-shrink-0"
                            aria-label="Delete topic"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {topic.description && (
                          <p className="text-sm text-muted-foreground mb-3">
                            {topic.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2">
                          <Select
                            value={topic.status}
                            onValueChange={(v) =>
                              updateStatus(topic.id, v as LearningTopic["status"])
                            }
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  <div className="flex items-center gap-2">
                                    {opt.value !== topic.status && (
                                      <ChevronRight className="w-3 h-3" />
                                    )}
                                    {opt.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-secondary/30 rounded-xl p-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        No {status.replace("-", " ")} topics
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Learning;
