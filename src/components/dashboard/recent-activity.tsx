'use client';

import { History } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { StudySession } from '@/lib/types';

const recentSessions: StudySession[] = [
  { id: '1', task: 'Review Cloud Concepts', project: 'AWS Cloud Learning', date: '2024-05-20', durationMinutes: 60 },
  { id: '2', task: 'Practice PMP Questions', project: 'Project Management Study', date: '2024-05-20', durationMinutes: 90 },
  { id: '3', task: 'Read Security+ Book', project: 'CISSP Study', date: '2024-05-19', durationMinutes: 45 },
  { id: '4', task: 'Watch Architecture Videos', project: 'AWS Cloud Learning', date: '2024-05-19', durationMinutes: 120 },
  { id: '5', task: 'Finalize Project Plan', project: 'Project Management Study', date: '2024-05-18', durationMinutes: 75 },
];

export function RecentActivity() {
  const t = useTranslations('RecentActivity');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><History className="text-primary"/> {t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('task')}</TableHead>
              <TableHead className="hidden sm:table-cell">{t('qualification')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('date')}</TableHead>
              <TableHead className="text-right">{t('duration')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentSessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>
                  <div className="font-medium">{session.task}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{session.project}</TableCell>
                <TableCell className="hidden md:table-cell">{session.date}</TableCell>
                <TableCell className="text-right">{session.durationMinutes} min</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
