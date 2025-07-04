import { ProjectManager } from '@/components/dashboard/qualification-manager';
import type { Project } from '@/lib/types';

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

export default function QualificationsPage() {
  return (
    <div>
      <ProjectManager initialProjects={projects} />
    </div>
  );
}
