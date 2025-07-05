import type { Project, StudySession } from '@/lib/types';

// Mock data
const projects: Project[] = [
  { 
    id: 'p1', 
    name: 'AWS Cloud Learning', 
    description: 'Studying for the AWS Certified Cloud Practitioner exam. Covering all core concepts including services, security, architecture, and pricing.'
  },
  { 
    id: 'p2', 
    name: 'Project Management Study', 
    description: 'Preparing for the PMP certification. Focusing on the five process groups: Initiating, Planning, Executing, Monitoring and Controlling, and Closing.'
  },
  { 
    id: 'p3', 
    name: 'CISSP Study', 
    description: 'Working towards the Certified Information Systems Security Professional certification. Covering topics like Security and Risk Management, Asset Security, and Security Architecture.'
  },
];

const recentSessions: StudySession[] = [
    { id: '1', project: 'AWS Cloud Learning', date: '2024-05-20', durationMinutes: 60 },
    { id: '2', project: 'Project Management Study', date: '2024-05-20', durationMinutes: 90 },
    { id: '3', project: 'CISSP Study', date: '2024-05-19', durationMinutes: 45 },
    { id: '4', project: 'AWS Cloud Learning', date: '2024-05-19', durationMinutes: 120 },
    { id: '5', project: 'Project Management Study', date: '2024-05-18', durationMinutes: 75 },
];

export async function getProjects(): Promise<Project[]> {
  // In a real app, this would fetch from a database
  return Promise.resolve(projects);
}

export async function getRecentSessions(): Promise<StudySession[]> {
    // In a real app, this would fetch from a database
    return Promise.resolve(recentSessions);
}

export async function searchProjects(query: string): Promise<Project[]> {
  const allProjects = await getProjects();
  if (!query) {
    return [];
  }
  return allProjects.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
  );
}
