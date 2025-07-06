export type Project = {
  id: string;
  user_id: string; // 追加
  name: string;
  description?: string;
};

export type StudySession = {
  id: string;
  project: string;
  date: string;
  durationMinutes: number;
};
