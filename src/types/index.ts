export interface Task {
  id: string;
  title: string;
  category: "work" | "study" | "personal";
  completed: boolean;
  createdAt: string;
}

export interface LearningTopic {
  id: string;
  title: string;
  description: string;
  status: "planned" | "in-progress" | "completed";
  createdAt: string;
}
