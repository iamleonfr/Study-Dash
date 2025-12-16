import { BookOpen, Target, Lightbulb, Rocket } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Task Management",
    description:
      "Organize daily tasks by category. Mark them complete, track your progress, and stay productive.",
  },
  {
    icon: BookOpen,
    title: "Learning Tracker",
    description:
      "Track your learning journey through different topics with status-based organization.",
  },
  {
    icon: Lightbulb,
    title: "Local Storage",
    description:
      "Your data persists in browser localStorage. No account needed, your progress is always saved.",
  },
];

const futureImprovements = [
  "Due dates and reminders for tasks",
  "Progress statistics and charts",
  "Export/import functionality",
  "Pomodoro timer integration",
  "Note-taking for learning topics",
  "Dark mode support",
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-primary mx-auto mb-4 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Student Learning & Task Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A clean, focused dashboard designed for dual study computer science students
            to manage learning and daily tasks effectively.
          </p>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div
            className="bg-card rounded-xl p-6 shadow-card animate-slide-up"
            style={{ animationDelay: "300ms" }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Technical Stack
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                React with TypeScript
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Tailwind CSS for styling
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Browser localStorage for persistence
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Responsive design for all devices
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                No backend or authentication required
              </li>
            </ul>
          </div>

          <div
            className="bg-card rounded-xl p-6 shadow-card animate-slide-up"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">
                Future Improvements
              </h2>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              {futureImprovements.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Purpose */}
        <div
          className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-xl p-8 text-center animate-slide-up"
          style={{ animationDelay: "500ms" }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Project Purpose
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This dashboard was built to demonstrate clean code practices, responsive
            design, and effective state management. It serves as a practical tool for
            students to organize their dual study journey while showcasing modern web
            development skills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
