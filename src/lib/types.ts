export type Project = {
  id: string;
  name: string;
  description?: string;
};

export type StudySession = {
  id: string;
  task: string;
  project: string;
  date: string;
  durationMinutes: number;
};
