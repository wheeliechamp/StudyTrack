import { StudyTimer } from '@/components/dashboard/study-timer';
import { AiStudyTips } from '@/components/dashboard/ai-study-tips';
import { StudyCharts } from '@/components/dashboard/study-charts';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { getProjects, getRecentSessions } from '@/lib/data';

export default async function DashboardPage() {
  const projects = await getProjects();
  const recentSessions = await getRecentSessions();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <StudyCharts />
        <RecentActivity initialSessions={recentSessions} />
      </div>
      <div className="lg:col-span-1 space-y-6">
        <StudyTimer projects={projects} />
        <AiStudyTips />
      </div>
    </div>
  );
}
