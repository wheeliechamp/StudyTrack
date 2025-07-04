import { StudyTimer } from '@/components/dashboard/study-timer';
import { AiStudyTips } from '@/components/dashboard/ai-study-tips';
import { StudyCharts } from '@/components/dashboard/study-charts';
import { RecentActivity } from '@/components/dashboard/recent-activity';
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
];

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <StudyCharts />
        <RecentActivity />
      </div>
      <div className="lg:col-span-1 space-y-6">
        <StudyTimer projects={projects} />
        <AiStudyTips />
      </div>
    </div>
  );
}
