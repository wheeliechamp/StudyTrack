'use server';

import { generateStudyTips } from '@/ai/flows/generate-study-tips';
import { z } from 'zod';

const learningHistorySchema = z.object({
  history: z.string().min(1, { message: 'Learning history cannot be empty.' }),
});

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { Project, StudySession } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

type State = {
  studyTips?: string[];
  message: 'success' | 'error' | 'idle';
  errors?: {
    history?: string[];
  } | null;
};

export async function getAiStudyTips(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = learningHistorySchema.safeParse({
    history: formData.get('history'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'error',
    };
  }

  try {
    const result = await generateStudyTips({ learningHistory: validatedFields.data.history });
    return { studyTips: result.studyTips, message: 'success' };
  } catch (error) {
    return {
      message: 'error',
      errors: { history: ['Failed to generate tips. Please try again later.'] },
    };
  }
}

export async function addProject(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  if (!name) {
    return { error: 'Project name is required.' };
  }

  const newProject: Project = {
    id: uuidv4(),
    name,
    description,
  };

  const { data, error } = await supabase
    .from('projects')
    .insert([newProject]);

  if (error) {
    console.error('Error adding project:', error);
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true, data };
}

export async function saveStudySession(projectId: string, durationSeconds: number) {
  if (!projectId || durationSeconds <= 0) {
    return { error: 'Invalid project or duration.' };
  }

  const newSession: StudySession = {
    id: uuidv4(),
    project: projectId,
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    durationMinutes: Math.round(durationSeconds / 60),
  };

  const { data, error } = await supabase
    .from('study_sessions')
    .insert([newSession]);

  if (error) {
    console.error('Error saving study session:', error);
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true, data };
}
