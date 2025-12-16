import { useState } from "react";
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task } from "@/types";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Tasks = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<Task["category"]>("study");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTask = () => {
    if (!newTitle.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    const task: Task = {
      id: crypto.randomUUID(),
      title: newTitle.trim(),
      category: newCategory,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([task, ...tasks]);
    setNewTitle("");
    toast.success("Task added successfully!");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Task Manager</h1>
          <p className="text-muted-foreground">
            Organize and track your daily tasks efficiently.
          </p>
        </div>

        {/* Add Task Form */}
        <div className="bg-card rounded-xl p-6 shadow-card mb-6 animate-slide-up">
          <h2 className="text-lg font-semibold text-foreground mb-4">Add New Task</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className="flex-1"
            />
            <Select value={newCategory} onValueChange={(v) => setNewCategory(v as Task["category"])}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="study">Study</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addTask} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 animate-slide-up" style={{ animationDelay: "50ms" }}>
          {(["all", "active", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className="bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${(index + 2) * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0 transition-transform hover:scale-110"
                    aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground hover:text-primary" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-foreground font-medium ${
                        task.completed ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusBadge variant={task.category}>{task.category}</StatusBadge>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                    aria-label="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-card rounded-xl p-8 shadow-card text-center animate-fade-in">
              <p className="text-muted-foreground">
                {filter === "all"
                  ? "No tasks yet. Add your first task above!"
                  : `No ${filter} tasks.`}
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        {tasks.length > 0 && (
          <div className="mt-6 text-sm text-muted-foreground text-center animate-fade-in">
            {tasks.filter((t) => !t.completed).length} tasks remaining •{" "}
            {tasks.filter((t) => t.completed).length} completed
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
