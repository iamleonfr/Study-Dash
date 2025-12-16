import { Link } from "react-router-dom";
import { CheckSquare, BookOpen, ArrowRight, Target, Clock, Trophy } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task, LearningTopic } from "@/types";
import { StatusBadge } from "@/components/StatusBadge";

const Index = () => {
  const [tasks] = useLocalStorage<Task[]>("tasks", []);
  const [topics] = useLocalStorage<LearningTopic[]>("learning-topics", []);

  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;
  const inProgressTopics = topics.filter((t) => t.status === "in-progress").length;
  const completedTopics = topics.filter((t) => t.status === "completed").length;

  const stats = [
    {
      label: "Pending Tasks",
      value: pendingTasks,
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      label: "Completed Tasks",
      value: completedTasks,
      icon: CheckSquare,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      label: "Learning In Progress",
      value: inProgressTopics,
      icon: Target,
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      label: "Topics Mastered",
      value: completedTopics,
      icon: Trophy,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  const recentTasks = tasks.slice(0, 3);
  const recentTopics = topics.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, Student! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your tasks and learning progress in one place.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Access Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Tasks */}
          <div className="bg-card rounded-xl p-6 shadow-card animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Recent Tasks</h2>
              </div>
              <Link
                to="/tasks"
                className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {recentTasks.length > 0 ? (
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-3 rounded-lg bg-secondary/50 ${
                      task.completed ? "opacity-60" : ""
                    }`}
                  >
                    <span className={`text-sm ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {task.title}
                    </span>
                    <StatusBadge variant={task.category}>{task.category}</StatusBadge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm py-4 text-center">
                No tasks yet. Start by adding your first task!
              </p>
            )}
          </div>

          {/* Recent Learning Topics */}
          <div className="bg-card rounded-xl p-6 shadow-card animate-slide-up" style={{ animationDelay: "250ms" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-semibold text-foreground">Learning Progress</h2>
              </div>
              <Link
                to="/learning"
                className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {recentTopics.length > 0 ? (
              <div className="space-y-3">
                {recentTopics.map((topic) => (
                  <div key={topic.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm text-foreground">{topic.title}</span>
                    <StatusBadge variant={topic.status}>
                      {topic.status.replace("-", " ")}
                    </StatusBadge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm py-4 text-center">
                No learning topics yet. Start tracking your progress!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
