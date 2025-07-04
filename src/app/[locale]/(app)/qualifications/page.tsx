import { ProjectManager } from '@/components/dashboard/qualification-manager';
import type { Project } from '@/lib/types';

// Mock data
const projects: Project[] = [
  { 
    id: 'p1', 
    name: 'AWS Cloud Learning', 
    subjects: [
      { id: 's1', name: 'Cloud Concepts' },
      { id: 's2', name: 'Security and Compliance' },
      { id: 's3', name: 'Technology' },
      { id: 's4', name: 'Billing and Pricing' },
    ]
  },
  { 
    id: 'p2', 
    name: 'Project Management Study', 
    subjects: [
      { id: 's5', name: 'Initiating' },
      { id: 's6', name: 'Planning' },
      { id: 's7', name: 'Executing' },
      { id: 's8', name: 'Monitoring and Controlling' },
      { id: 's9', name: 'Closing' },
    ]
  },
  { 
    id: 'p3', 
    name: 'CISSP Study', 
    subjects: [
      { id: 's10', name: 'Security and Risk Management' },
      { id: 's11', name: 'Asset Security' },
      { id: 's12', name: 'Security Architecture and Engineering' },
    ]
  },
];

export default function QualificationsPage() {
  return (
    <div>
      <ProjectManager initialProjects={projects} />
    </div>
  );
}
