export type Project = {
  id: string;
  name: string;
  subjects: Subject[];
};

export type Subject = {
  id: string;
  name: string;
};

export type StudySession = {
  id: string;
  subject: string;
  project: string;
  date: string;
  durationMinutes: number;
};
