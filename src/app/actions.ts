'use server';

import { generateStudyTips } from '@/ai/flows/generate-study-tips';
import { z } from 'zod';

const learningHistorySchema = z.object({
  history: z.string().min(1, { message: 'Learning history cannot be empty.' }),
});

import { createClient } from '@/lib/supabase/server';
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
    return { error: 'projectNameRequired' }; // キーに変更
  }

  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  console.log('Supabase user data:', user); // 追加
  console.log('Supabase user error:', userError); // 追加

  if (userError || !user) {
    console.error('Error getting user:', userError);
    return { error: 'userNotAuthenticated' }; // キーに変更
  }

  // ユニークチェック
  const { data: existingProjects, error: checkError } = await supabase
    .from('projects')
    .select('id')
    .eq('name', name)
    .eq('user_id', user.id);

  if (checkError) {
    console.error('Error checking existing projects:', checkError);
    return { error: 'databaseError' }; // キーに変更
  }

  if (existingProjects && existingProjects.length > 0) {
    return { error: 'projectAlreadyExists' }; // キーに変更
  }

  const newProject: Project = {
    id: uuidv4(),
    user_id: user.id,
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

export async function deleteProject(projectId: string) {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('Error getting user:', userError);
    return { error: 'User not authenticated.' };
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)
    .eq('user_id', user.id); // RLSポリシーを考慮してuser_idも条件に追加

  if (error) {
    console.error('Error deleting project:', error);
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function updateProject(projectId: string, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  if (!name) {
    return { error: 'projectNameRequired' }; // キーに変更
  }

  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('Error getting user:', userError);
    return { error: 'userNotAuthenticated' }; // キーに変更
  }

  // ユニークチェック (更新時)
  const { data: existingProjects, error: checkError } = await supabase
    .from('projects')
    .select('id')
    .eq('name', name)
    .eq('user_id', user.id)
    .neq('id', projectId); // 更新対象のプロジェクト自身は除外

  if (checkError) {
    console.error('Error checking existing projects for update:', checkError);
    return { error: 'databaseError' }; // キーに変更
  }

  if (existingProjects && existingProjects.length > 0) {
    return { error: 'projectAlreadyExists' }; // キーに変更
  }

  const { error } = await supabase
    .from('projects')
    .update({ name, description })
    .eq('id', projectId)
    .eq('user_id', user.id); // RLSポリシーを考慮してuser_idも条件に追加

  if (error) {
    console.error('Error updating project:', error);
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function saveStudySession(projectId: string, durationSeconds: number) {
  if (!projectId || durationSeconds <= 0) {
    return { error: 'Invalid project or duration.' };
  }

  const supabase = createClient();

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
