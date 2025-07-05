import { ProjectManager } from '@/components/dashboard/project-manager';
import { getProjects } from '@/lib/data';

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return (
    <div>
      <ProjectManager initialProjects={projects} />
    </div>
  );
}
