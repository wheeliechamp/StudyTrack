import { createClient } from '@/lib/supabase/server';
import type { Project, StudySession } from '@/lib/types';

export async function getProjects(): Promise<Project[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from('projects').select('*');
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data as Project[];
}

export async function getRecentSessions(): Promise<StudySession[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from('study_sessions').select('*').order('date', { ascending: false }).limit(5);
  if (error) {
    console.error('Error fetching recent sessions:', error);
    return [];
  }
  return data as StudySession[];
}

export async function searchProjects(query: string): Promise<Project[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .ilike('name', `%${query}%`)
    .or('description.ilike', `%${query}%`);

  if (error) {
    console.error('Error searching projects:', error);
    return [];
  }
  return data as Project[];
}
