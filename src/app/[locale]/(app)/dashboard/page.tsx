import { supabase } from '@/lib/supabase';
import { ProjectManager } from '@/components/dashboard/project-manager';
import { StudyTimer } from '@/components/dashboard/study-timer';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { StudyCharts } from '@/components/dashboard/study-charts';
import { AiStudyTips } from '@/components/dashboard/ai-study-tips';
import { Separator } from '@/components/ui/separator';
import { getTranslations } from 'next-intl/server';
import { getRecentSessions } from '@/lib/data';

export default async function DashboardPage() {
  
  const { data: projects, error: projectsError } = await supabase.from('projects').select('*');
  const recentSessions = await getRecentSessions();

  if (projectsError) {
    console.error('Error fetching projects:', projectsError);
    return <div>Error loading projects.</div>;
  }

  const t = await getTranslations('DashboardPage');

  return (
    <div className="flex flex-col space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      <Separator className="my-6" />
      <ProjectManager initialProjects={projects || []} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <StudyCharts />
          <RecentActivity initialSessions={recentSessions} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <StudyTimer projects={projects || []} />
          <AiStudyTips />
        </div>
      </div>
    </div>
  );
}
