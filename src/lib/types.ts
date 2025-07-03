export type Qualification = {
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
  qualification: string;
  date: string;
  durationMinutes: number;
};
