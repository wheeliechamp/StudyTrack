import { searchProjects } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectManager } from '@/components/dashboard/project-manager';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

function SearchResult({ projects, query }: { projects: Awaited<ReturnType<typeof searchProjects>>, query: string }) {
  const t = getTranslations('SearchPage');

  return (
    <>
      {projects.length > 0 ? (
        <ProjectManager initialProjects={projects} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t('noResults')}</CardTitle>
            <CardDescription>{t('noResultsDescription', { query })}</CardDescription>
          </CardHeader>
        </Card>
      )}
    </>
  )
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  const projects = await searchProjects(query);
  const t = await getTranslations('SearchPage');

  return (
    <div className='space-y-4'>
      <h1 className="text-2xl font-bold">{t('title', { query: query })}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResult projects={projects} query={query} />
      </Suspense>
    </div>
  );
}
